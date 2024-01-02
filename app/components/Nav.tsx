import { SNIPPETS_METADATA } from "@/constant";
import Link from "next/link";
import Image from "next/image";
import { readAllTechnologies } from "@/api/snippets/service";
import { Technology } from "@prisma/client";

const Nav = async () => {
  const { data: technologies } = await readAllTechnologies();
  const renderLinkItem = (technology: Technology) => {
    const snippetMetadata = SNIPPETS_METADATA[technology];
    return (
      <li key={technology} className="transition transform hover:scale-125">
        <Link
          href={`/snippets/technology/${technology}`}
          className="flex items-center gap-4 font-semibold"
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

  return (
    <div className="text-white bg-main-900 py-8 px-6  min-w-[12rem] text-sm rounded-lg flex h-full  justify-center">
      <ul className="space-y-2">{technologies?.map(renderLinkItem)}</ul>
    </div>
  );
};

export { Nav };
