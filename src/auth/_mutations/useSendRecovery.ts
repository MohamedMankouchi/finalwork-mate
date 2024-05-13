import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { getUserByEmail } from "../_queries/useUserExists";

const sendRecovery = async (email: string) => {
  const url = window.location.origin;
  const user = await getUserByEmail(email);

  if (!user) {
    throw { message: "Invalid email" };
  }
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${url}/reset-password`,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const useSendRecovery = () => {
  return useMutation({
    mutationFn: sendRecovery,
    onError: (error) => {
      return error;
    },
  });
};
