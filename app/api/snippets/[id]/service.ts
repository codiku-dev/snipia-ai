"use server";
import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Snippet } from "@prisma/client";
import { z } from "zod";
import { updateSnippetSchema } from "./schema";

export const deleteSnippet = async (
  id: number
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
    const deletedSnippet = await db.snippet.delete({ where: { id, userId } });
    return {
      data: deletedSnippet,
      message: "Snippet deleted successfully",
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message: "Something went wrong when deleting the snippet",
    };
  }
};

export const updateSnippet = async (
  id: number,
  body: typeof updateSnippetSchema._type
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
    try {
      updateSnippetSchema.parse(body);
    } catch (error) {
      return {
        data: null,
        error: true,
        status: 500,
        message: (error as z.ZodError).issues
          .map((err) => "Field '" + err.path + "' : " + err.message)
          .toString(),
      };
    }
    const updatedSnippet = await db.snippet.update({
      where: { id, userId },
      data: body,
    });

    return {
      data: updatedSnippet,
      message: "Snippet updated successfully",
    };
  } catch (err) {
    return {
      data: null,
      error: true,
      status: 500,
      message: "Something went wrong when updating the snippet ",
    };
  }
};

const readSnippetSchema = z.object({
  userId: z.string().min(1),
});

export const readSnippet = async (
  id: number,
  queryParams: typeof readSnippetSchema._type
): Promise<ApiResponse<Snippet>> => {
  try {
    readSnippetSchema.parse(queryParams);
    /* const { userId } = auth();
    if (!userId) {
      return {
        error: true,
        status: 401,
        message: "User not signed in",
      };
    }
*/
    const snippetFound = await db.snippet.findUnique({
      where: { id, userId: queryParams.userId },
    });

    return {
      data: snippetFound,
    };
  } catch (err) {
    return {
      data: null,
      error: true,
      status: 500,
      message: "Something went wrong when fetching the snippet ",
    };
  }
};
