"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { TourProvider } from "@reactour/tour";
import { Toaster } from "sonner";
import { TUTORIAL_STEPS } from "@/components/Tutorial/constant";
import { TutorialComponent } from "@/components/Tutorial/Tutorial";

const queryClient = new QueryClient();

export function Providers(p: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <TourProvider
        steps={TUTORIAL_STEPS}
        defaultOpen={false}
        showPrevNextButtons={false}
        ContentComponent={TutorialComponent}
        styles={{
          popover: (base) => ({
            ...base,
            maxWidth: "none",
          }),
        }}
      >
        <ReactQueryDevtools />
        <SkeletonTheme highlightColor="#141519" baseColor="#1A1B1F">
          {p.children}
        </SkeletonTheme>
      </TourProvider>
    </QueryClientProvider>
  );
}
