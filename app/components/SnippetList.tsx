import { SnippetCard } from "@/components/SnippetCard";
import { withSkeletonHoc } from "@/lib/suspense";
import { WithFallback } from "@/types/fallback";
import { Snippet } from "@prisma/client";

export const SnippetList = withSkeletonHoc(
  (p: { snippets: Snippet[] } & WithFallback) => {
    return (
      <div className="p-20 flex flex-wrap gap-y-20 gap-x-6">
        {p.snippets.map((snippet) => (
          <SnippetCard
            isFallback={p.isFallback}
            key={snippet.id}
            snippet={snippet}
          />
        ))}
      </div>
    );
  },
  <div className="p-20 flex flex-wrap gap-y-20 gap-x-6">
    {[1, 2, 3, 4, 5].map((i) => (
      <SnippetCard isFallback key={i} snippet={null} />
    ))}
  </div>
);
