import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

export const getFiles = async (userId: string) => {
  const { data } = await supabase
    .from("files")
    .select("*, users(*)")
    .eq("user_id", userId);

  return data;
};

export const useGetSharedFiles = (userId: string) => {
  return useQuery({
    queryFn: () => getFiles(userId),
    queryKey: ["users", "user", userId, "files"],
  });
};
