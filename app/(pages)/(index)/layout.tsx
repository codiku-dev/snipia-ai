import { Header } from "@/components/Header/Header";
import { NavSuspense } from "@/components/Nav/Nav";

export default async function SnippetLayout(p: { children: React.ReactNode }) {
  return (
    <div>
      <Header nav={<NavSuspense />} />
      <div className="flex p-8 mt-2">
        <div className="hidden md:block">
          <NavSuspense />
        </div>
        <div className="w-full md:ml-8 overflow-x-hidden ">{p.children}</div>
      </div>
    </div>
  );
}
