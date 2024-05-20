import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { getUserById } from "../../profile/_queries/useUserDetails";

export const checkChat = async (id: number, userId: string) => {
  const { data } = await supabase
    .from("chat")
    .select("*")
    .eq("id", id)
    .single();

  if (data?.user1 === userId) {
    const user = await getUserById(data.user2);
    return { data, user };
  }

  const user = await getUserById(data?.user1 as string);
  return { data, user };
};

export const useCheckChat = (id: number, userId: string) => {
  return useQuery({
    queryFn: () => checkChat(id, userId),
    queryKey: ["chat", id, userId],
  });
};
