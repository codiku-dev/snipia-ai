"use client";
import { RiSearchLine } from "react-icons/ri";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { TUTO_SELECTORS } from "./Tutorial/constant";
import { useTour } from "@reactour/tour";

export function SearchBar(p: { onChange: (query: string) => void }) {
  const router = useRouter();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    p.onChange(e.currentTarget.value);
  }
  const input = (
    <div className="relative w-full">
      <input
        placeholder="Search a snippet..."
        onChange={handleOnChange}
        className="pl-10"
      />
      <RiSearchLine className="h-5 w-5 absolute top-2 left-3 text-gray-400" />
    </div>
  );
  return (
    <div className="bg-main-900 p-6 rounded-lg flex space-x-4">
      {input}
      <button
        id={TUTO_SELECTORS.ADD_FIRST_SNIPPET}
        className="w-24 fixed bottom-20 right-10 md:static"
        onClick={() => {
          router.push("/snippets/create");
        }}
      >
        + NEW
      </button>
    </div>
  );
}

export const SearchBarSkel = (
  <Skeleton className=" rounded-lg" height={88} count={1} />
);
