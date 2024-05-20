import { useQuery } from "@tanstack/react-query";

import { userKeys } from "../../auth/UserQueryKeys";
import { supabase } from "../../database/supabase";
import { getUserById } from "./useUserDetails";

type Friends = ({
  banner_pic: string | null;
  created_at: string;
  education: string;
  email: string;
  firstname: string;
  id: string;
  languages: string;
  lastname: string;
  profile_pic: string | null;
} | null)[];
export const checkFriends = async (id: string): Promise<Friends> => {
  const { data } = await supabase
    .from("friends")
    .select("*")
    .or(`sender.eq.${id},receiver.eq.${id})`)
    .eq("status", "accepted");

  if (data?.length === 0) {
    return [];
  }
  const friends = data!.map((el) => {
    if (el.sender === id) {
      return el.receiver;
    } else {
      return el.sender;
    }
  });

  const friendList = friends?.map(async (el) => getUserById(el));

  return await Promise.all(friendList);
};

export const useGetFriends = (id: string) => {
  return useQuery({
    queryFn: () => checkFriends(id),
    queryKey: userKeys.friends(id),
  });
};
