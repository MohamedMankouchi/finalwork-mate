import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { forumKeys } from "../forumKeys";

export type getQuestionsProps = {
  created_at: string;
  created_by: string | null;
  description: string;
  folder: string | null;
  id: string;
  status: boolean | null;
  title: string;
  users: {
    firstname: string;
    lastname: string;
    profile_pic: string | null;
  } | null;
};
const getQuestions = async (): Promise<getQuestionsProps[]> => {
  const { data, error } = await supabase.from("forums").select(`*, users(*)`);

  if (error) {
    throw error;
  }
  return data;
};

export const useQuestions = () => {
  return useQuery({
    queryFn: getQuestions,
    queryKey: forumKeys.all,
  });
};
