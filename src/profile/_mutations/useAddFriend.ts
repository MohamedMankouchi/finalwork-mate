import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "../../auth/UserQueryKeys";
import { supabase } from "../../database/supabase";

const addFriend = async (receiver_id: string, sender_id: string) => {
  const { error } = await supabase
    .from("friends")
    .insert({ receiver: receiver_id, sender: sender_id });

  await supabase
    .from("notifications")
    .insert({ receiver: receiver_id, sender: sender_id, type: "request" });
  if (error) {
    throw error;
  }
};

export const useAddFriend = (receiver_id: string, sender_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addFriend(receiver_id, sender_id),
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.checkFriends(receiver_id, sender_id),
      });
    },
  });
};
