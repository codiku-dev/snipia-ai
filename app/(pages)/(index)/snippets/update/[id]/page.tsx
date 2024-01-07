import { readSnippet } from "@/api/snippets/[id]/service";
import { FormUpdateSnippet } from "@/components/FormUpdateSnippet/FormUpdateSnippet";
import { auth } from "@clerk/nextjs";

export default async function UpdateSnippetPage(p: { params: { id: string } }) {
  const { userId } = auth();
  const { data: snippet } = await readSnippet(Number(p.params.id), {
    userId: userId!,
  });
  return (
    <div className="overflow-y-scroll h-full ">
      <FormUpdateSnippet snippet={snippet!} />
    </div>
  );
}
