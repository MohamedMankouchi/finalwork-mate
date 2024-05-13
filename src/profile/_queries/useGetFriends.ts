import { useQuery } from "@tanstack/react-query";

import { userKeys } from "../../auth/UserQueryKeys";
import { supabase } from "../../database/supabase";

export const checkFriends = async (id: string) => {
  const { data } = await supabase
    .from("friends")
    .select("*")
    .or(`sender.eq.${id},receiver.eq.${id})`)
    .eq("status", "accepted");

  return data;
};

export const useGetFriends = (id: string) => {
  return useQuery({
    queryFn: () => checkFriends(id),
    queryKey: userKeys.friends(id),
  });
};
