"use client";

import { SNIPPETS_METADATA } from "@/constant";
import { useMutation } from "@tanstack/react-query";

import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/FieldError";
import { updateSnippet } from "@/api/snippets/[id]/service";
import { updateSnippetSchema } from "@/api/snippets/[id]/schema";
import { Button } from "../Button";

const MAX_LENGTH_CONTENT = 5000;
const formSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(5),
  content: z.string().min(1).max(MAX_LENGTH_CONTENT),
  technology: z.nativeEnum(Technology),
});
export type Form = typeof formSchema._type;

export function FormUpdateSnippet(p: { snippet: Snippet }) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: p.snippet.content,
      title: p.snippet.title,
      technology: p.snippet.technology,
      name: p.snippet.name,
    },
  });

  const { mutate: createSnippetMut, isPending } = useMutation({
    mutationFn: (body: Form) => updateSnippet(p.snippet.id, body),
    onSuccess: ({ error, message }) => {
      toast(
        <ul>
          {message?.split(",").map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      );
      if (!error) {
        router.push("/");
        router.refresh();
      }
    },
  });
  const submitServerAction = async (formData: Form) => {
    createSnippetMut(formData);
  };

  const inputTitle = (
    <div className="space-y-3 w-72">
      <label htmlFor="title">Title</label>
      <input {...register("title")} id="title" />
      <FieldError errors={errors} name="title" />
    </div>
  );

  const technoSelect = (
    <div className="space-y-3 w-80">
      <label htmlFor="technology">Framework / Technology / Language</label>
      <select {...register("technology")} id="technology">
        {Object.keys(SNIPPETS_METADATA).map((techno) => {
          const { technology: value, label } = SNIPPETS_METADATA[techno];
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <FieldError errors={errors} name="technology" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <label htmlFor="content">Content</label>
      <textarea {...register("content")} className="h-96" id="content" />
      <FieldError errors={errors} name="content" />
    </div>
  );

  const inputName = (
    <div className="space-y-3">
      <label htmlFor="name" className="flex items-center space-x-4">
        <div>Name</div>
      </label>
      <input {...register("name")} id="name" />
      <FieldError errors={errors} name="name" />
    </div>
  );
  return (
    <form
      onSubmit={handleSubmit(submitServerAction)}
      className="space-y-8 w-[50rem] "
    >
      <div className="space-y-6">
        <h1>Update snippet</h1>
        {inputTitle}
        {inputName}
        {technoSelect}
        {textareaContent}
      </div>
      <div className="flex justify-end ">
        <Button disabled={isPending}>Save</Button>
      </div>
    </form>
  );
}
