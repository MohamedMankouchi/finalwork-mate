import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { userKeys } from "../UserQueryKeys";

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  sessionStorage.removeItem("token");
  if (error) {
    throw error;
  }
  return;
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.user("current") });
      queryClient.removeQueries({ queryKey: ["markers"] });
    },
  });
};
