import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

const acceptRequest = async ({
  id,
  user1,
  user2,
}: {
  id: number;
  user1: string;
  user2: string;
}) => {
  const { error } = await supabase
    .from("notifications")
    .update({ isDeleted: true })
    .eq("id", id);

  const { error: requestError } = await supabase
    .from("friends")
    .delete()
    .or(`sender.eq.${user1},and(receiver.eq.${user1})`)
    .or(`receiver.eq.${user2},and(sender.eq.${user2})`);
  if (error) {
    throw error;
  }

  if (requestError) {
    throw requestError;
  }
};

export const useDeclineRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptRequest,

    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
