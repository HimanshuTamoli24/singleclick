import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link
        href="/builder"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium"
      >
        Go to Carousel Builder
      </Link>
    </div>
  );
}
