import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { getUserById } from "../../profile/_queries/useUserDetails";

type Friends = ({
  from: string;
  id: number;
  marker_id: number;
  to: string;
  user_id: string | null;
  users: {
    banner_pic: string | null;
    created_at: string;
    education: string;
    email: string;
    firstname: string;
    id: string;
    languages: string;
    lastname: string;
    profile_pic: string | null;
  } | null;
} | null)[];
export const getFriends = async (
  id: string,
  markerId: number
): Promise<Friends> => {
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

  const friendList = await Promise.all(
    friends.map(async (el: string) => getUserById(el))
  );
  const list = await Promise.all(
    friendList.map(async (el) => {
      const { data } = await supabase
        .from("plannings")
        .select("*, users(*)")
        .eq("marker_id", markerId)
        .eq("user_id", el?.id as string);
      if (data?.length !== 0) {
        return data;
      }
      return [];
    })
  );

  return list.flat();
};

export const useFriendsPlanned = (
  userId: string,
  markerId: number,
  enabled: boolean
) => {
  return useQuery({
    enabled: enabled,
    queryFn: () => getFriends(userId, markerId),
    queryKey: ["markers", "friends", markerId ?? 0],
  });
};
