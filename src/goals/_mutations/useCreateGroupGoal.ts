import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { getUserByEmail } from "../../auth/_queries/useUserExists";
import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";
type addFileProps = {
  friends: string[];
  from: string;
  title: string;
  to: string;
  user_id: string;
};
const createGoal = async ({
  from,
  title,
  user_id,
  to,
  friends,
}: addFileProps) => {
  const { data, error } = await supabase
    .from("goals")
    .insert({
      created_by: user_id,
      end: to,
      isGroup: true,
      start: from,
      title,
    })
    .select()
    .single();

  const { error: groupError } = await supabase.from("goalsGroup").insert({
    goal_id: data!.id,
    user_id: user_id,
  });

  if (groupError) throw groupError;
  friends.forEach(async (friend) => {
    const user = await getUserByEmail(friend);

    if (user && data) {
      const { error } = await supabase.from("goalsGroup").insert({
        goal_id: data.id,
        user_id: user.id,
      });

      if (error) {
        throw error;
      }
    }
  });

  if (error) {
    throw error;
  }
};

export const useCreateGroupGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.group() });
    },
  });
};
