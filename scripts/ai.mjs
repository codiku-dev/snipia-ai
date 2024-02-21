import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const chatModel = new ChatOllama({
  baseUrl: "http://localhost:3000", // Default value
  model: "codellama",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a world class code analyzer. You provide information about code. Provide a short name for this piece of code, also provide the programming language used",
  ],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel);

await chain.invoke({
  input: "console.log('Hello world')",
});
