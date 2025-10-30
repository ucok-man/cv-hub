import Link from "next/link";
import MaxWidthWrapper from "../max-width-wrapper";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full py-4 z-30 shadow">
      <MaxWidthWrapper className="bg-card rounded-full px-6 py-3 flex w-full items-center justify-between max-w-fit">
        <Link
          className="text-xl uppercase tracking-wide font-semibold"
          href="/"
        >
          <div className="bg-clip-text text-transparent bg-linear-to-r from-foreground via-stone-400 to-foreground font-mono">
            CV-Hub
          </div>
        </Link>
      </MaxWidthWrapper>
    </nav>
  );
}
