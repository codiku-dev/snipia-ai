import { Suspense } from "react";
import { NavItem } from "./NavItem";
import Skeleton from "react-loading-skeleton";
import { readAllTechnologies } from "@/api/snippets/service";
import { delayReq } from "@/lib/mock";
export async function Nav() {
  const { data: technologies } = await delayReq(
    await readAllTechnologies(),
    3000
  );
  const renderTechnologies = technologies?.map((t) => (
    <NavItem key={t} technology={t} />
  ));

  return (
    technologies?.length! > 0 && (
      <div className="">
        <div className="flex flex-col space-y-6 p-6 text-white bg-main-900 py-8  text-sm rounded-lg justify-center">
          <h2>Categories</h2>
          <ul className="space-y-2">{renderTechnologies}</ul>
        </div>
      </div>
    )
  );
}

export const NavSuspense = () => (
  <Suspense
    fallback={
      <div className="flex flex-col space-y-6 p-6 text-white bg-main-900 py-8  text-sm rounded-lg justify-center">
        <h2>Categories</h2>
        <ul className="space-y-2">
          <Skeleton
            className="px-5 min-w-[8rem] rounded-lg"
            height={30}
            count={5}
          />
        </ul>
      </div>
    }
  >
    <Nav />
  </Suspense>
);
