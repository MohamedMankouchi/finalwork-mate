import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { userKeys } from "../UserQueryKeys";
type Credentials = {
  email: string;
  password: string;
};
const signIn = async (credentials: Credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    throw error;
  }
  return await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onError: (error) => {
      return error;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.user("current"), data.data);
    },
  });
};
