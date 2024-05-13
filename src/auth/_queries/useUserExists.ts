import { useQuery } from "@tanstack/react-query";

import { Tables } from "../../_models/database.types";
import { supabase } from "../../database/supabase";
import { userKeys } from "../UserQueryKeys";

export const getUserByEmail = async (
  email: string
): Promise<Tables<"users"> | null> => {
  const data = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  return data.data;
};

export const useUser = (email: string) => {
  return useQuery({
    queryFn: () => getUserByEmail(email),
    queryKey: userKeys.userExists(email),
  });
};
