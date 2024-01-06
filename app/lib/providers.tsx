"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
const queryClient = new QueryClient();
export function Providers(p: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SkeletonTheme highlightColor="#141519" baseColor="#1A1B1F">
        {p.children}
      </SkeletonTheme>
    </QueryClientProvider>
  );
}