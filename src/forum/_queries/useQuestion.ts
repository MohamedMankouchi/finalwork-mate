import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { forumKeys } from "../forumKeys";

const getQuestion = async (forumId: string) => {
  const { data, error } = await supabase
    .from("forums")
    .select(
      `*, users(*), forum_messages(id, message, file, isAnswer, created_at, users(*))`
    )
    .eq("id", forumId)
    .single();

  const { data: files, error: fileError } = await supabase.storage
    .from("forum")
    .list(forumId);

  if (error) {
    throw error;
  }

  if (fileError) {
    throw fileError;
  }

  return { data, files: files.filter((file) => file.name !== "files") };
};

export const useQuestion = (forumId: string) => {
  return useQuery({
    queryFn: () => getQuestion(forumId),
    queryKey: forumKeys.forum(forumId),
  });
};
