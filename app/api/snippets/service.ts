"use server";
import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Snippet, Technology } from "@prisma/client";
import { createSnippetSchema, readAllSnippetsSchema } from "./schema";

export const readAllSnippet = async (
  queryParams: typeof readAllSnippetsSchema._type
): Promise<ApiResponse<Snippet[]>> => {
  try {
    readAllSnippetsSchema.parse(queryParams);

    const snippet = await db.snippet.findMany({ where: { ...queryParams } });

    return {
      data: snippet,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong when fetching snippets " +
        (error as Error).message,
    };
  }
};

export const createSnippet = async (
  body: typeof createSnippetSchema._type
): Promise<ApiResponse<Snippet>> => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        data: null,
        error: true,
        status: 401,
        message: "User not signed in",
      };
    }

    createSnippetSchema.parse(body);

    const snippetCreated = await db.snippet.create({
      data: {
        ...body,
        userId,
      },
    });

    return {
      data: snippetCreated,
      message: "Snippet created successfully",
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message: "Something went wrong when creating the snippet",
    };
  }
};

export const readAllTechnologies = async (): Promise<
  ApiResponse<Technology[]>
> => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        data: null,
        error: true,
        status: 401,
        message: "User not signed in",
      };
    }

    const technologies = (
      await db.snippet.groupBy({
        by: ["technology"],
        where: { userId },
      })
    ).map((tech) => tech.technology);

    return {
      data: technologies,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong when fetching snippets " +
        (error as Error).message,
    };
  }
};
