import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { userKeys } from "../UserQueryKeys";

const ResetPassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    throw error;
  }

  await supabase.auth.signOut();
  return data;
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ResetPassword,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.user("current") });
    },
  });
};
