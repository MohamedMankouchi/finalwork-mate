import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

const addTask = async ({
  title,
  friend,
  goal_id,
}: {
  friend: string;
  goal_id: number;
  title: string;
}) => {
  const { error } = await supabase.from("todos").insert({
    assigned_to: friend,
    goal_id,
    name: title,
  });
  await supabase
    .from("goals")
    .update({ last_updated_at: new Date().toISOString() })
    .eq("id", goal_id);
  if (error) {
    throw error;
  }
};

export const useAddTaskGroup = () => {
  return useMutation({
    mutationFn: addTask,
    onError: (error) => {
      return error;
    },
  });
};
