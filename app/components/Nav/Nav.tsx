import { readAllTechnologies } from "@/api/snippets/service";
import { NavItem } from "./NavItem";
import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";
export async function Nav() {
  const { data: technologies } = await readAllTechnologies();

  const renderTechnologies = technologies?.map((t) => (
    <NavItem key={t} technology={t} />
  ));

  return (
    technologies?.length! > 0 && (
      <div className="hidden md:flex text-white bg-main-900 py-8  text-sm rounded-lg  h-full  justify-center min-w-[12rem]">
        <ul className="space-y-2">{renderTechnologies}</ul>
      </div>
    )
  );
}

export const NavSuspense = () => (
  <Suspense
    fallback={
      <div className="text-white bg-main-900 py-8  text-sm rounded-lg flex h-full  justify-center min-w-[12rem]">
        <div className="space-y-2">
          <Skeleton
            className="px-5 min-w-[8rem] rounded-lg"
            height={30}
            count={5}
          />
        </div>
      </div>
    }
  >
    <Nav />
  </Suspense>
);
