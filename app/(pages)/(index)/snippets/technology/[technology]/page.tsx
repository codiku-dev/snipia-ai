import { SnippetSearch } from "@/components/SnippetSearch";
import { db } from "@/lib/db";
import { delayReq } from "@/lib/mock";
import { auth } from "@clerk/nextjs";
import { Language, Technology } from "@prisma/client";

export default async function SnippetByLngPage(p: {
  params: { technology: Technology };
}) {
  const { userId } = auth();
  const snippets = await delayReq(
    await db.snippet.findMany({
      where: { userId: userId!, technology: p.params.technology },
    }),
    2000
  );

  return <SnippetSearch snippets={snippets} />;
}
