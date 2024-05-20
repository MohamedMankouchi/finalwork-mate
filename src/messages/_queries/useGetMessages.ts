import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

const getMessages = async (id: number, userId: string) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("chat_id", id)
    .order("created_at", { ascending: true });

  const chat = await supabase
    .from("chat")
    .select("*")
    .eq("id", id)
    .or(`user1.eq.${userId},user2.eq.${userId}`)
    .single();
  if (error) throw error;
  return { chat, data };
};

export const useGetMessages = (id: number, userId: string) => {
  return useQuery({
    queryFn: () => getMessages(id, userId),
    queryKey: ["chat", id],
  });
};
