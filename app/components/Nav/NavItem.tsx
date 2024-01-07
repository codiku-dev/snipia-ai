"use client";
import { SNIPPETS_METADATA } from "@/constant";
import { Technology } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItem = (p: { technology: Technology }) => {
  const pathname = usePathname();
  const snippetMetadata = SNIPPETS_METADATA[p.technology];
  return (
    <li
      key={p.technology}
      className={`transition transform hover:scale-125 min-w-[8rem]  ${
        pathname === "/snippets/technology/" + p.technology &&
        "bg-main-50/20  rounded-lg"
      }`}
    >
      <Link
        href={`/snippets/technology/${p.technology}`}
        className={`flex items-center gap-4 font-semibold `}
      >
        <Image
          src={snippetMetadata.src}
          alt={"Icon for the technology " + snippetMetadata.label}
          width={30}
          height={30}
        />
        <span>{snippetMetadata.label}</span>
      </Link>
    </li>
  );
};
