import { FormCreateSnippet } from "@/components/FormCreateSnippet/FormCreateSnippet";

export default async function CreateSnippetPage() {
  return (
    <div className="overflow-y-scroll h-full pb-40">
      <FormCreateSnippet />
    </div>
  );
}
