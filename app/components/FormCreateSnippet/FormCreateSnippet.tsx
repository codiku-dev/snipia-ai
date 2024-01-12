"use client";
import { RxMagicWand } from "react-icons/rx";
import { SNIPPETS_METADATA } from "@/constant";
import { useForm } from "react-hook-form";
import { Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FieldError } from "@/components/FieldError";
import { ClipboardEvent, useEffect } from "react";
import { genCodeMetadata } from "@/api/text-cortex/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSnippet } from "@/api/snippets/service";
import { Button } from "../Button";
import { WithFallback } from "@/types/fallback";
import { withSkeleton } from "@/lib/suspense";
import Skeleton from "react-loading-skeleton";
import { useTour } from "@reactour/tour";
import { TUTO_SELECTORS } from "../Tutorial/constant";

const MAX_LENGTH_CONTENT = 5000;
const formSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(5),
  content: z.string().min(1).max(MAX_LENGTH_CONTENT),
  technology: z.nativeEnum(Technology),
});

type Form = typeof formSchema._type;

export const FormCreateSnippet = withSkeleton(
  (p: WithFallback) => {
    const router = useRouter();
    const { setCurrentStep } = useTour();
    const nextTutorialStep = () => {
      setCurrentStep((step) => step + 1);
    };
    const query = useQueryClient();
    useEffect(() => {
      if (localStorage.getItem("tutorial-done") !== "true") {
        navigator.clipboard.writeText("console.log('Hello World !')");
        nextTutorialStep();
      }
    }, []);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
    } = useForm<Form>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {},
    });
    const content = watch("content");
    const name = watch("name");
    const commandNpx = "npx -y snipia add " + name;
    const { mutate: createSnippetMut, isPending } = useMutation({
      mutationFn: createSnippet,
      onSuccess: ({ error, message }) => {
        toast[error ? "error" : "success"](
          error ? message : "Snippet created successfully"
        );
        if (!error) {
          console.log("invalidate");
          query.invalidateQueries({ queryKey: ["snippets"] });
          console.log("tuto-command", commandNpx);
          localStorage.setItem("tuto-command", commandNpx);
          router.push("/");
        }
      },
    });

    const submit = async (formData: Form) => {
      const language = SNIPPETS_METADATA[formData.technology].language;
      createSnippetMut({
        ...formData,
        language,
      });
    };

    const handleContentPaste = async (
      e: ClipboardEvent<HTMLTextAreaElement>
    ) => {
      const pastedText = e.clipboardData.getData("Text");
      if (pastedText.trim().length < MAX_LENGTH_CONTENT) {
        const { data } = await genCodeMetadata(pastedText);

        if (data) {
          setValue("title", data.title);
          if (SNIPPETS_METADATA[data.technology]) {
            setValue("name", data.technology + "-" + data.name);
            setValue("technology", data.technology);
          }
        }
      }
      nextTutorialStep();
    };

    const technoSelect = (
      <div className="space-y-3 w-80">
        <label htmlFor="technology" className="flex space-x-4">
          <div>Framework / Technology / Language</div> <RxMagicWand />
        </label>
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

    const inputTitle = (
      <div className="space-y-3">
        <label htmlFor="title" className="flex items-center space-x-4">
          <div>Title</div> <RxMagicWand />
        </label>
        <input {...register("title")} id="title" />
        <FieldError errors={errors} name="title" />
      </div>
    );

    const inputName = (
      <div className="space-y-3">
        <label htmlFor="name" className="flex items-center space-x-4">
          <div>Name</div> <RxMagicWand />
        </label>
        <input {...register("name")} id="name" />
        <FieldError errors={errors} name="name" />
      </div>
    );

    const textareaContent = (
      <div className="space-y-3">
        <label htmlFor="content">Content</label>
        <textarea
          {...register("content")}
          id={TUTO_SELECTORS.PASTE_CODE}
          className="h-96 w-full"
          onPaste={handleContentPaste}
          placeholder="Paste your snippet here..."
        />
        <FieldError errors={errors} name="content" />
      </div>
    );
    return (
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-8  max-w-[50rem] "
      >
        <div className="space-y-6">
          <h1>New snippet</h1>
          {textareaContent}
          {content && (
            <div id={TUTO_SELECTORS.AI}>
              <div>
                {inputName}
                {inputTitle}
                {technoSelect}
              </div>

              <div className="flex justify-end">
                <Button disabled={isPending}>Save</Button>
              </div>
            </div>
          )}
        </div>
      </form>
    );
  },
  <div className="space-y-8 max-w-[50rem]">
    <div className="space-y-6">
      <Skeleton height={50} />
      <Skeleton height={20} />
      <Skeleton height={384} />
    </div>
  </div>
);
