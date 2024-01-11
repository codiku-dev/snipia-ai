"use client";
import { SearchBar } from "@/components/SearchBar";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { SNIPPETS_METADATA } from "@/constant";
import { WithFallback } from "@/types/fallback";
import { SnippetList } from "./SnippetList";
import { useWindowHeight } from "@/lib/hooks/use-window-height";

export function SnippetSearch(p: { snippets: Snippet[] } & WithFallback) {
  const windowH = useWindowHeight();
  const [currSearchQuery, setCurrSearchQuery] = useState<string>("");

  const filteredSnippets = p.snippets!.filter((s) =>
    [
      s.language,
      s.technology,
      s.title,
      SNIPPETS_METADATA[s.technology].label,
    ].some((field) =>
      field.toLowerCase().includes(currSearchQuery?.toLowerCase())
    )
  );

  const linkCreateSnippet = (
    <div className="text-white flex h-full  flex-col justify-center items-center">
      {"You don't have any snippet !"}
      <Link
        href="/snippets/create"
        className="underline underline-offset-4 text-white"
      >
        Start by creating one
      </Link>
    </div>
  );

  const renderCountResults = () => {
    if (currSearchQuery !== "" && !p.isFallback) {
      return (
        <div className="text-white mt-2 flex items-center justify-center">
          {filteredSnippets.length} snippets found for the query :{" "}
          <span className="font-semibold">
            {'"'}
            {currSearchQuery}
            {'"'}
          </span>
        </div>
      );
    }
  };
  return (
    <main className="flex flex-col " style={{ height: windowH - 180 }}>
      <SearchBar onChange={setCurrSearchQuery} />
      <div className="overflow-y-auto  h-full">
        {renderCountResults()}

        <div>
          <SnippetList isFallback={p.isFallback} snippets={filteredSnippets} />
          {p.snippets.length === 0 && !p.isFallback && linkCreateSnippet}
        </div>
      </div>
    </main>
  );
}
