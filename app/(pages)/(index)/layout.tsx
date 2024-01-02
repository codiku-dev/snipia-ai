import { readAllSnippet } from "@/api/snippets/service";
import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";
import { auth } from "@clerk/nextjs";
export default async function SnippetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="flex p-8">
        <Nav />
        <div className="ml-8 w-full h-screen">{children}</div>
      </div>
    </div>
  );
}
