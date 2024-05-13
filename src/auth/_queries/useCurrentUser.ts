import { useQuery } from "@tanstack/react-query";

import { Tables } from "../../_models/database.types";
import { supabase } from "../../database/supabase";
import { userKeys } from "../UserQueryKeys";
import { getUserByEmail } from "./useUserExists";

const getCurrentUser = async (): Promise<Tables<"users"> | null> => {
  const currentUser = (await supabase.auth.getUser()).data.user;
  if (!currentUser) {
    return null;
  }
  const email = currentUser.email!;
  return await getUserByEmail(email);
};

export const useCurrentUser = () => {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: userKeys.user("current"),
  });
};
