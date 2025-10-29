import { Readable } from "stream";
import { cloudinary } from "./cloudinary";

export async function uploadImages(images: Buffer[]) {
  try {
    const urls: string[] = [];
    for (const image of images) {
      const url = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "cv-hub",
            allowed_formats: ["png"],
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result?.secure_url)
              return reject(new Error("No URL returned"));
            resolve(result.secure_url);
          }
        );

        const readableStream = new Readable();
        readableStream.push(image);
        readableStream.push(null); // This signals the end of the stream — it means no more data will be pushed.
        readableStream.pipe(uploadStream);
      });

      urls.push(url);
    }
    return urls;
  } catch (error) {
    throw Error(`Error uploading image: ${error}`);
  }
}
