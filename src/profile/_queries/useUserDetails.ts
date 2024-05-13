import { useQuery } from "@tanstack/react-query";

import { userKeys } from "../../auth/UserQueryKeys";
import { supabase } from "../../database/supabase";

export const getUserById = async (id: string) => {
  const data = await supabase.from("users").select("*").eq("id", id).single();
  return data.data;
};

export const useUserDetails = (id: string) => {
  return useQuery({
    queryFn: () => getUserById(id),
    queryKey: userKeys.user(id),
  });
};
