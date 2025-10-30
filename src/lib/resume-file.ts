import { PDFParse } from "pdf-parse";
import { getPath } from "pdf-parse/worker";
import { fromBuffer } from "pdf2pic";
import { Options } from "pdf2pic/dist/types/options";
import { openai } from "./openai";
import { Feedback, FeedbackSchema } from "./types";
PDFParse.setWorker(getPath());

const instruction = (jobTitle: string, jobDescription: string) => `
You are an expert in ATS (Applicant Tracking Systems), resume analysis, and HR recruitment.

You will be given:
1. The resume **text content** — extracted OCR text of the resume.
2. The resume **images** — the actual visual pages of the resume (scanned or screenshot versions).

Use **both** the text and images together:
- Use the **text content** to analyze writing quality, relevance, and keyword alignment.
- Use the **images** to evaluate structure, visual layout, formatting consistency, and section clarity.

Your task:
Analyze how well this resume fits the given job posting and provide detailed, honest feedback.
If there are weaknesses, be explicit and give practical improvement tips.
Low scores are acceptable if the resume truly needs work.

Use the following information about the target job:
- **Job Title:** ${jobTitle}
- **Job Description:** ${jobDescription}

Your analysis must cover:
1. Overall fit and ATS performance.
2. Content quality and keyword alignment.
3. Tone and style (professionalism, clarity, relevance).
4. Structure and readability.
5. Skills and achievements relevance.

---

### **Output Format (Required)**

Return your analysis **as a single valid JSON object** only — no extra text, markdown, or comments.  
Do **not** include backticks, explanations, or any other wrapping text.

The JSON must strictly follow this schema:

{
  "overallScore": number, // 0–100, overall quality
  "ATS": {
    "score": number, // 0–100, how well it would perform in ATS systems
    "tips": [
      { "type": "good" | "improve", "tip": string }
    ]
  },
  "toneAndStyle": {
    "score": number,
    "tips": [
      { 
        "type": "good" | "improve", 
        "tip": string, // Short tip title 
        "explanation": string // Explanation from the tip
      }
    ]
  },
  "content": {
    "score": number,
    "tips": [
      { 
        "type": "good" | "improve", 
        "tip": string, // Short tip title 
        "explanation": string // Explanation from the tip
      }
    ]
  },
  "structure": {
    "score": number,
    "tips": [
      { 
        "type": "good" | "improve", 
        "tip": string, // Short tip title 
        "explanation": string // Explanation from the tip
      }
    ]
  },
  "skills": {
    "score": number,
    "tips": [
      { 
        "type": "good" | "improve", 
        "tip": string, // Short tip title 
        "explanation": string // Explanation from the tip
      }
    ]
  }
}

---

### ⚠️ **Important Formatting Rules**
- Return **only** valid JSON.
- Do **not** include any text before or after the JSON.
- Do **not** use code blocks, markdown, or backticks.
- Ensure all strings are properly quoted and JSON-parsable.

If the provided text or image content is unclear, make reasonable assumptions and proceed with best-effort analysis.
`;

export class ResumeFile {
  constructor(private file: File) {}

  async screenshots() {
    try {
      const fileBuffer = Buffer.from(await this.file.arrayBuffer());

      // Configure converter
      const options: Options = {
        density: 300, // DPI
        format: "png", // or 'jpg', 'jpeg'

        // A4
        width: 2480,
        height: 3508,
      };

      // convert job setup
      const convert = fromBuffer(fileBuffer, options);

      // Convert all pages (-1 means all pages)
      const pages = await convert.bulk(-1, { responseType: "buffer" });

      // Assign array of image buffers
      return pages.map((page) => page.buffer!).filter(Boolean);
    } catch (error) {
      throw new Error(`Error convert file to image: ${error}`);
    }
  }

  async text() {
    const fileBuffer = Buffer.from(await this.file.arrayBuffer());
    const parser = new PDFParse({
      data: fileBuffer,
    });

    try {
      const { text } = await parser.getText();
      return text;
    } catch (error) {
      throw new Error(`Error parsing pdf file: ${error}`);
    } finally {
      await parser.destroy();
    }
  }

  async analyze(param: {
    jobTitle: string;
    jobDescription: string;
    imageurls: string[];
    textcontent: string;
  }) {
    const { imageurls, textcontent, jobTitle, jobDescription } = param;

    const prompt = {
      type: "input_text" as const,
      text: instruction(jobTitle, jobDescription),
    };

    const inputText = {
      type: "input_text" as const,
      text: `This is the text content of the resume:\n\n${textcontent}`,
    };
    const inputImages = imageurls.map((url) => ({
      type: "input_image" as const,
      image_url: url,
      detail: "auto" as const,
    }));

    try {
      let feedback: Feedback | null = null;
      for (let i = 0; i < 3; i++) {
        const response = await openai.responses.create({
          model: "gpt-4.1",
          input: [
            {
              role: "user",
              content: [prompt, inputText, ...inputImages],
            },
          ],
        });

        const text = response.output_text?.trim() ?? "";
        const json = JSON.parse(text);
        const { success, data } = FeedbackSchema.safeParse(json);
        if (!success) continue;

        feedback = data;
        break;
      }

      if (!feedback) {
        throw new Error("Invalid output format structure");
      }

      return feedback;
    } catch (error) {
      throw new Error(`Failed analyzing resume: ${error}`);
    }
  }
}
