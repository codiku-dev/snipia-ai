"use client";
import { useTour } from "@reactour/tour";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { TUTO_SELECTORS, getStepIndex } from "./components/Tutorial/constant";
import { useQuery } from "@tanstack/react-query";
import { readAllSnippet } from "./api/snippets/service";
import { useAuth } from "@clerk/nextjs";

export default function TemplateMain(p: { children: ReactNode }) {
  const { userId } = useAuth();
  const { setIsOpen, currentStep, setCurrentStep } = useTour();
  const pathname = usePathname();
  const { data: response, status } = useQuery({
    queryKey: ["snippets"],
    queryFn: () => readAllSnippet({ userId: userId! }),
  });

  useEffect(() => {
    if (status === "success" && response.data?.length! > 0) {
      if (currentStep === getStepIndex(TUTO_SELECTORS.AI)) {
        setTimeout(() => {
          setCurrentStep(getStepIndex(TUTO_SELECTORS.COMMAND));
        }, 500);
      }
    }
  }, [status, response]);

  useEffect(
    function handleTutorial() {
      console.log(currentStep);
      if (
        localStorage.getItem("tutorial-done") !== "true" &&
        pathname === "/"
      ) {
        if (currentStep == getStepIndex(TUTO_SELECTORS.ADD_FIRST_SNIPPET)) {
          setIsOpen(true);
          localStorage.setItem("tutorial-done", "true");
        }
      }
    },
    [pathname]
  );
  return <>{p.children}</>;
}
