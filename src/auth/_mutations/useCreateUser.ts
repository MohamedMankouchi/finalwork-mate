import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { imageUpload } from "../fileUpload";
import { userKeys } from "../UserQueryKeys";

type createUserProps = {
  bannerPic?: File;
  education: string;
  email: string;
  firstname: string;
  languages: string[];
  lastname: string;
  password: string;
  profilePic?: File;
};

const createUser = async ({
  bannerPic,
  education,
  email,
  firstname,
  languages,
  lastname,
  password,
  profilePic,
}: createUserProps) => {
  const url = window.location.origin;
  const data = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (data.data) {
    throw { message: "User with this email already exists" };
  }
  const { error } = await supabase.auth.signUp({
    email,
    options: {
      data: {
        banner_pic: bannerPic
          ? `${process.env.STORAGE_URL}/banner_${email}`
          : `${process.env.STORAGE_URL}/default_banner.jpg`,
        education,
        firstname,
        languages,
        lastname,
        profile_pic: profilePic
          ? `${process.env.STORAGE_URL}/profile_${email}`
          : `${process.env.STORAGE_URL}/default_profile.png`,
      },
      emailRedirectTo: `${url}/profile`,
    },
    password,
  });

  if (error) {
    throw error;
  }

  if (profilePic) {
    await imageUpload({ file: profilePic, filename: `profile_${email}` });
  }

  if (bannerPic) {
    await imageUpload({ file: bannerPic, filename: `banner_${email}` });
  }
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
