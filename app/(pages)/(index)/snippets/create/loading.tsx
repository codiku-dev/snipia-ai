import { FormCreateSnippet } from "@/components/FormCreateSnippet/FormCreateSnippet";
import { SnippetDetail } from "@/components/SnippetDetail";
import Skeleton from "react-loading-skeleton";

export default async function LoadingPage(p: {}) {
  return (
    <div className="overflow-y-scroll h-full ">
      <FormCreateSnippet isFallback />
    </div>
  );
}
