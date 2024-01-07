import { SnippetSearch } from "@/components/SnippetSearch";

export default async function LoadingPage() {
  return <SnippetSearch snippets={[]} isFallback />;
}
