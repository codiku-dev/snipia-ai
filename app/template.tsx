"use client";
import { useAuth } from "@clerk/nextjs";
import { useTour } from "@reactour/tour";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { readAllSnippet } from "./api/snippets/service";
import { TUTO_SELECTORS, getStepIndex } from "./components/Tutorial/constant";

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
      if (
        localStorage.getItem("tutorial-done") !== "true" &&
        pathname === "/" && response?.data?.length! < 2
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
