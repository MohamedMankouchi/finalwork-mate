import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { forumKeys } from "../forumKeys";

type MarkAnswerProps = {
  forum_id: string;
  id: number;
};
const markAnswer = async ({ forum_id, id }: MarkAnswerProps) => {
  const { error } = await supabase
    .from("forum_messages")
    .update({ isAnswer: true })
    .eq("id", id);

  const { error: forumError } = await supabase
    .from("forums")
    .update({ status: true })
    .eq("id", forum_id);

  if (error) {
    throw error;
  }

  if (forumError) {
    throw forumError;
  }
};

export const useMarkAnswer = (forumId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAnswer,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.forum(forumId) });
    },
  });
};
