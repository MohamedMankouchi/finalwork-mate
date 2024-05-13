import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";

type makePlanProps = {
  from: string;
  marker_id?: number;
  to: string;
  user_id: string;
};
const makePlan = async ({ from, to, marker_id, user_id }: makePlanProps) => {
  const { data, error } = await supabase
    .from("plannings")
    .insert({ from, marker_id: marker_id as number, to, user_id });

  if (error) {
    throw error;
  }

  return data;
};

export const useMakePlan = () => {
  return useMutation({
    mutationFn: makePlan,
    onError: (error) => {
      return error;
    },
  });
};
