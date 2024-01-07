import { Header } from "@/components/Header";
import { Nav, NavSuspense } from "@/components/Nav/Nav";

export default async function SnippetLayout(p: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex p-8">
        <NavSuspense />
        <div className="md:ml-8 w-full h-screen">{p.children}</div>
      </div>
    </div>
  );
}
