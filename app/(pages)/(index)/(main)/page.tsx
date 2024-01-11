import { readAllSnippet } from "@/api/snippets/service";
import { SnippetSearch } from "@/components/SnippetSearch";
import { delayReq } from "@/lib/mock";

import { auth } from "@clerk/nextjs";

export default async function IndexPage() {
  const { userId } = auth();
  const { data: snippets } = await delayReq(
    await readAllSnippet({ userId: userId! })
  );

  return <SnippetSearch snippets={snippets!} />;
}
