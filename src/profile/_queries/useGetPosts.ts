import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

export const getFiles = async (userId: string) => {
  const { data } = await supabase
    .from("forums")
    .select("*, users(*)")
    .eq("created_by", userId);

  return data;
};

export const useGetPosts = (userId: string) => {
  return useQuery({
    queryFn: () => getFiles(userId),
    queryKey: ["users", "user", userId, "posts"],
  });
};
