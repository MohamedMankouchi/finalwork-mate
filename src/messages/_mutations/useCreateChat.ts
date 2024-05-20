import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

export const checkFriends = async (user1: string, user2: string) => {
  const { data, error } = await supabase.from("chat").insert({ user1, user2 });
  if (error) {
    throw error;
  }
  return data;
};

export const useCreateChat = (user1: string, user2: string) => {
  return useMutation({
    mutationFn: () => checkFriends(user1, user2),
    mutationKey: ["chat", user1, user2],
    onError: (error) => {
      return error;
    },
  });
};
