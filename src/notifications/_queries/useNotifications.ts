import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

export const getUserNotifications = async (id: string) => {
  const data = await supabase
    .from("notifications")
    .select("*, users(*)")
    .eq("receiver", id)
    .eq("isDeleted", false)
    .order("created_at", { ascending: false });
  return data.data;
};

export const useNotifications = (id: string) => {
  return useQuery({
    queryFn: () => getUserNotifications(id),
    queryKey: ["notifications"],
  });
};
