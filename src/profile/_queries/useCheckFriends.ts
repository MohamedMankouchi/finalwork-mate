import { useQuery } from "@tanstack/react-query";

import { userKeys } from "../../auth/UserQueryKeys";
import { supabase } from "../../database/supabase";

export const checkFriends = async (receiver_id: string, sender_id: string) => {
  const { data } = await supabase
    .from("friends")
    .select("*")
    .or(`sender.eq.${sender_id},and(receiver.eq.${sender_id})`)
    .or(`receiver.eq.${receiver_id},and(sender.eq.${receiver_id})`)
    .single();

  return data;
};

export const useCheckFriends = (
  receiver_id: string,
  sender_id: string,
  user: boolean
) => {
  return useQuery({
    enabled: user,
    queryFn: () => checkFriends(receiver_id, sender_id),
    queryKey: userKeys.checkFriends(receiver_id, sender_id),
  });
};
