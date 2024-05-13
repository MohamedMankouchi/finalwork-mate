import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const getGroupGoal = async (goal_id: number) => {
  const { data, error } = await supabase
    .from("goals")
    .select(`*, goalsGroup(users(*))`)
    .match({ id: goal_id, isGroup: true });

  if (error) throw error;
  const { data: todos } = await supabase
    .from("todos")
    .select(`*, goals!inner(*)`)
    .eq("goal_id", goal_id)
    .eq("goals.isGroup", true)
    .order("isDone", { ascending: true });
  return { data, todos };
};

export const useGroupGoal = (goal_id: number) => {
  return useQuery({
    queryFn: () => getGroupGoal(goal_id),
    queryKey: goalKeys.groupSpecific(goal_id),
  });
};
