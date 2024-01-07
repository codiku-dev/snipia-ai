import { SnippetDetail } from "@/components/SnippetDetail";
import Skeleton from "react-loading-skeleton";

export default async function LoadingPage(p: {}) {
  return <SnippetDetail isFallback />;
}
