"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

export function DrawerMobile(p: PropsWithChildren) {
  const [isDrawerMobileOpen, setIsDrawerMobileOpen] = useState(false);
  const pathName = usePathname();
  useEffect(
    function onPathNameChange() {
      setIsDrawerMobileOpen(false);
    },
    [pathName]
  );
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDrawerMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  const trigger = (
    <TbLayoutSidebarRightCollapse
      onClick={() => setIsDrawerMobileOpen(!isDrawerMobileOpen)}
      className="md:hidden text-white w-7 h-7 cursor-pointer hover:text-main-50"
    />
  );

  const drawer = (
    <div
      className={`${
        isDrawerMobileOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-full transition-all duration-500 transform  bg-main-900 shadow-lg `}
    >
      <div className="px-6 py-4">{p.children}</div>
    </div>
  );

  const overlay = (
    <div
      onClick={() => setIsDrawerMobileOpen(false)}
      className="z-30 top-0 left-0 absolute w-full h-full bg-main-300/80"
    />
  );
  return (
    <div className="md:hidden">
      {trigger}
      {drawer}
      {isDrawerMobileOpen && overlay}
    </div>
  );
}
