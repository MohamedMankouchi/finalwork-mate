import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "../../auth/UserQueryKeys";
import { supabase } from "../../database/supabase";

const removeFriend = async (id: number) => {
  const { error } = await supabase.from("friends").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

export const useRemoveFriend = (receiver_id: string, sender_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFriend,
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
