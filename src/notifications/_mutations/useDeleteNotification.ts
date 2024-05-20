import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

const deleteNotification = async (id: number) => {
  const { error } = await supabase
    .from("notifications")
    .update({ isDeleted: true })
    .eq("id", id);

  if (error) {
    throw error;
  }
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
