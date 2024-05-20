import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

const getMessages = async (userId: string) => {
  const chat = await supabase
    .from("chat")
    .select("*, chat_messages(*)")
    .or(`user1.eq.${userId},user2.eq.${userId}`);
  return chat;
};

export const useGetMessageForUser = (userId: string) => {
  return useQuery({
    queryFn: () => getMessages(userId),
    queryKey: ["chat", userId, "all"],
  });
};
