"use client";
import { RxCopy } from "react-icons/rx";
import { Snippet } from "@prisma/client";
import { SNIPPETS_METADATA } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect } from "react";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import { withSkeleton } from "@/lib/suspense";
import { WithFallback } from "@/types/fallback";
import { useTour } from "@reactour/tour";
import { TUTO_SELECTORS, getStepIndex } from "./Tutorial/constant";

export const SnippetCard = withSkeleton(
  (p: { snippet: Snippet; index: number } & WithFallback) => {
    const { setCurrentStep, steps } = useTour();

    const progLngItem = SNIPPETS_METADATA[p.snippet.technology];

    const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      navigator.clipboard.writeText("npx -y snipia add " + p.snippet.name);
      toast("Command copied into clipboard");

      setCurrentStep(getStepIndex(TUTO_SELECTORS.USER_ID));
    };

    const body = (
      <div className="h-full flex items-center md:items-end  ">
        <div className="flex w-full  md:h-20">
          <div className=" flex-grow pl-4 ">
            <div className="font-semibold text-md text-main-100 uppercase">
              {p.snippet.technology}
            </div>
            <div className="flex justify-between text-white">
              <div className="text-sm line-clamp-3 pr-1">{p.snippet.title}</div>
            </div>
          </div>
        </div>
        <div
          onClick={copyCodeToClipboard}
          id={p.index === 0 ? TUTO_SELECTORS.COMMAND : undefined}
          className="top-0 h-full md:h-24 right-0 text-xs md:text-base w-24 absolute md:w-20  flex items-center justify-center  hover:bg-main-600 rounded-br-3xl rounded-tr-3xl  md:rounded-bl-3xl md:rounded-br-none text-white "
        >
          <RxCopy className="w-5 h-5" />
        </div>
      </div>
    );
    const radialGradient = (
      <div
        style={{
          background: `radial-gradient(circle at center, ${progLngItem.color} 15%, #0A0B0F 70%)`,
        }}
        className={` opacity-20 absolute  h-full w-full -top-20 -left-20`}
      />
    );
    return (
      <Link
        href={`/snippets/${p.snippet.id}`}
        className={`mx-4 hover:ring-[0.5px] hover:ring-[${progLngItem.color}] relative cursor-pointer shadow-xl bg-main-900 h-20 w-full md:h-52 md:w-60 rounded-3xl transition transform hover:scale-105 `}
      >
        <div className="overflow-hidden relative rounded-tl-3xl  h-full w-full">
          {radialGradient}
          {body}
        </div>
        <Image
          className="w-8 md:w-24 absolute -top-3 md:-top-10 md:left-10"
          src={progLngItem.src}
          alt="Prog language image"
        />
      </Link>
    );
  },
  <Skeleton height={208} width={240} style={{ borderRadius: 24 }} />
);
