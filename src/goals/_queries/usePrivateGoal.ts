import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const getPrivateGoal = async (user_id: string, goal_id: number) => {
  const { data, error } = await supabase
    .from("goals")
    .select(`*`)
    .match({ created_by: user_id, id: goal_id, isGroup: false })
    .single();

  const { data: todos } = await supabase
    .from("todos")
    .select(`*`)
    .eq("goal_id", goal_id)
    .order("isDone", { ascending: true });
  if (error) throw error;

  return { data, todos };
};

export const usePrivateGoal = (user_id: string, goal_id: number) => {
  return useQuery({
    queryFn: () => getPrivateGoal(user_id, goal_id),
    queryKey: goalKeys.privateSpecific(goal_id),
  });
};
