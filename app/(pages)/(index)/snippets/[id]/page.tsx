import { SnippetDetail } from "@/components/SnippetDetail";
import { db } from "@/lib/db";
import { delayReq } from "@/lib/mock";
import { auth } from "@clerk/nextjs";

export default async function SnippetDetailPage(p: { params: { id: string } }) {
  const { userId } = auth();

  const snippet = await delayReq(
    await db.snippet.findFirst({
      where: { userId: userId!, id: Number(p.params.id) },
    }),
    1000
  );

  if (!snippet) {
    return <div>No snippet found...</div>;
  }

  return <SnippetDetail snippet={snippet} />;
}
