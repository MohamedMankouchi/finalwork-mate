import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const getPrivateGoals = async (user_id: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select(`*`)
    .match({ created_by: user_id, isGroup: false })
    .order("last_updated_at", { ascending: false });
  if (error) throw error;
  const { data: todos } = await supabase
    .from("todos")
    .select(`*, goals!inner(*)`)
    .eq("goals.created_by", user_id)
    .eq("goals.isGroup", false);
  return { data, todos };
};

export const usePrivateGoals = (user_id: string, enabled: boolean) => {
  return useQuery({
    enabled,
    queryFn: () => getPrivateGoals(user_id),
    queryKey: goalKeys.private(),
  });
};
