import { PopoverContentProps, components } from "@reactour/tour";
import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TUTO_SELECTORS, getStepIndex } from "./constant";

export const TutorialComponent = (p: PopoverContentProps) => {
  switch (p.currentStep) {
    case getStepIndex(TUTO_SELECTORS.COMMAND):
      return (
        <GenericTutoContent {...p}>
          <SyntaxHighlighter
            customStyle={{ height: "auto" }}
            showLineNumbers
            language={"bash"}
            style={theme}
          >
            {localStorage.getItem("tuto-command") || ""}
          </SyntaxHighlighter>
        </GenericTutoContent>
      );
    default:
      return <GenericTutoContent {...p} />;
  }
};

export const GenericTutoContent = (
  p:
    | PopoverContentProps & {
        children?: ReactNode;
        className?: string;
      }
) => {
  const step = p.steps[p.currentStep];
  return (
    <div>
      <components.Badge {...p}>
        {`${p.currentStep + 1}/${p.steps.length}`}
      </components.Badge>
      {typeof step.content === "function"
        ? (step.content({
            ...p,
            disabledActions: true,
          }) as unknown as JSX.Element)
        : step.content}
      {p.children}
      <components.Navigation
        {...p}
        disableAll={step.disableActions}
        Arrow={() => null}
      />
    </div>
  );
};

export const TutoCommandStepContent = (p: PopoverContentProps) => (
  <SyntaxHighlighter
    customStyle={{ height: "auto" }}
    showLineNumbers
    language={"bash"}
    style={theme}
  >
    {localStorage.getItem("tuto-command") || ""}
  </SyntaxHighlighter>
);

/*
export const TutoBadge: ComponentType<any> | undefined = (p) => {
  return (
    <components.Badge
      styles={{ badge: (base) => ({ ...base, backgroundColor: "red" }) }}
    >
      👉 {p.children} 👈
    </components.Badge>
  );
};
export const TutoContent: ComponentType<any> | undefined = (p) => {
  const isLastStep = p.currentStep === p.steps.length - 1;
  const content = p.steps[p.currentStep].content;
  return (
    <div style={{ border: "5px solid red", padding: 10, background: "white" }}>
      {typeof content === "function"
        ? content({ ...p, someOtherStuff: "Custom Text" })
        : content}
      <button
        onClick={() => {
          if (isLastStep) {
            p.setIsOpen(false);
          } else {
            p.setCurrentStep((s) => s + 1);
          }
        }}
      >
        {isLastStep ? "x" : ">"}
      </button>
    </div>
  );
};

export const TutoCloseBtn: ComponentType<any> | undefined = (p: {
  onClick: () => void;
}) => {
  return (
    <button
      onClick={p.onClick}
      style={{ position: "absolute", right: 0, top: 0 }}
    >
      x
    </button>
  );
};
*/
