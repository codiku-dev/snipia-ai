export const getStepIndex = (step: string) => {
  return Number(step.split("tuto-")[1]);
};

export const TUTO_SELECTORS = {
  ADD_FIRST_SNIPPET: "tuto-0",
  PASTE_CODE: "tuto-1",
  AI: "tuto-2",
  COMMAND: "tuto-3",
  USER_ID: "tuto-4",
};
export const TUTORIAL_STEPS = [
  {
    selector: "#" + TUTO_SELECTORS.ADD_FIRST_SNIPPET,
    content:
      "Hey, you don't have any code snippet yet ! Create your first snippet",
    disableActions: true,
  },
  {
    selector: "#" + TUTO_SELECTORS.PASTE_CODE,
    content: "I have added some code into your clipboard, press ctrl+v !",
    disableActions: true,
  },

  {
    selector: "#" + TUTO_SELECTORS.AI,
    content:
      "If you code is not to big, the AI is going to generate some informations about it ! If you are satisfed, save !",
    disableActions: true,
  },

  {
    selector: "#" + TUTO_SELECTORS.COMMAND,
    content:
      "Click to copy the command into your clip board.            You can even add a file path at the end of the command to create a file out of it.",
    disableActions: true,
  },
  {
    selector: "#" + TUTO_SELECTORS.USER_ID,
    content:
      "Once you ran the npx command, your userId will be asked once ever. You can click here to copy it.",
    disableActions: true,
  },
];
