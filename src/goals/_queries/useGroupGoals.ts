import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const getGroupGoals = async (user_id: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select(`*, goalsGroup!inner(users(*))`)
    .eq("isGroup", true);

  const groups = data?.filter((el) =>
    el.goalsGroup.find(
      (user: { users: { id: string } }) => user.users.id === user_id
    )
  );

  const { data: todos } = await supabase
    .from("todos")
    .select(`*, goals!inner(*)`)
    .eq("goals.isGroup", true);
  if (error) throw error;
  return { groups, todos };
};

export const useGroupGoals = (enabled: boolean, user_id: string) => {
  return useQuery({
    enabled,
    queryFn: () => getGroupGoals(user_id),
    queryKey: goalKeys.group(),
  });
};
