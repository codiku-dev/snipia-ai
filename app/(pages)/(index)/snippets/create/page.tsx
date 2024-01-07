import { FormCreateSnippet } from "@/components/FormCreateSnippet/FormCreateSnippet";
import { delayReq } from "@/lib/mock";

export default async function CreateSnippetPage() {
  await delayReq(1, 2000);
  return (
    <div className="overflow-y-scroll h-full pb-40">
      <FormCreateSnippet />
    </div>
  );
}
