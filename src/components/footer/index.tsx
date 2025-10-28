export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-t-border/70 bg-linear-to-b from-background ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-xl font-bold text-primary font-mono">CV-HUB</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Streamline your hiring process with intelligent CV analyzer.
          </p>
          <p className="text-sm text-muted-foreground">
            © {currentYear} CV-Hub. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
