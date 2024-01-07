import { FormUpdateSnippet } from "@/components/FormUpdateSnippet/FormUpdateSnippet";
import { SnippetDetail } from "@/components/SnippetDetail";

export default async function LoadingPage(p: {}) {
  return (
    <div className="overflow-y-scroll h-full">
      <FormUpdateSnippet isFallback />
    </div>
  );
}
