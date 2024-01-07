import { Header } from "@/components/Header/Header.client";
import { NavSuspense } from "@/components/Nav/Nav";

export default async function SnippetLayout(p: { children: React.ReactNode }) {
  return (
    <div>
      <Header nav={<NavSuspense />} />
      <div className="flex p-8">
        <div className="hidden md:block">
          <NavSuspense />
        </div>
        <div className="md:ml-8 w-full h-screen">{p.children}</div>
      </div>
    </div>
  );
}
