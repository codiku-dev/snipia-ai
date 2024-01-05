import { readAllTechnologies } from "@/api/snippets/service";
import { NavItem } from "./NavItem";
import { delayReq } from "@/lib/mock";
import Skeleton from "react-loading-skeleton";
import { PropsWithChildren, Suspense } from "react";
export async function Nav() {
  const { data: technologies } = await delayReq(
    await readAllTechnologies(),
    3000
  );

  return (
    technologies?.length! > 0 && (
      <div className="text-white bg-main-900 py-8  text-sm rounded-lg flex h-full  justify-center min-w-[12rem]">
        <ul className="space-y-2">
          {technologies?.map((t) => (
            <NavItem technology={t} />
          ))}
        </ul>
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
