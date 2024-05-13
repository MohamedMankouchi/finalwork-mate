import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { forumKeys } from "../forumKeys";

type ReplyQuestionProps = {
  file: File;
  forum_id: string;
  message: string;
  user_id: string;
};
const createQuestion = async ({
  user_id,
  forum_id,
  message,
  file,
}: ReplyQuestionProps) => {
  const { error } = await supabase
    .from("forum_messages")
    .insert({ file: file?.name, forum_id, message, user_id });

  if (error) {
    throw error;
  }

  if (file) {
    const { error } = await supabase.storage
      .from("forum")
      .upload(`${forum_id}/files/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error?.message) {
      throw error;
    }
  }
};

export const useReplyQuestion = (forumId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestion,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.forum(forumId) });
    },
  });
};
