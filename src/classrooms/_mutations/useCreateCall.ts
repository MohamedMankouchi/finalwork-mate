import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tables } from "../../_models/database.types";
import { supabase } from "../../database/supabase";
import { classroomKeys } from "../classroomKeys";

type createClassroomProps = {
  bannerImg?: File;
  client: StreamVideoClient;
  description?: string;
  password: string;
  title: string;
  user: Tables<"users">;
};
const createClassroom = async ({
  bannerImg,
  description,
  title,
  user,
  password,
  client,
}: createClassroomProps) => {
  const randomId = crypto.randomUUID();

  const createCall = client.call("default", randomId);

  await createCall.getOrCreate({
    data: {
      custom: {
        bannerImg: bannerImg
          ? `https://mozbjvkzioecoqndvhjl.supabase.co/storage/v1/object/public/pictures/banner_${randomId}`
          : "https://marketplace.canva.com/EAEeOQwo3jY/1/0/1600w/canva-purple-mountain-vintage-retro-twitch-banner-1NYTq34QR6I.jpg",
        description,
        password: password ? password : null,
        title,
        user,
      },
    },
  });

  if (bannerImg) {
    const { error } = await supabase.storage
      .from("pictures")
      .upload(`banner_${randomId}`, bannerImg, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error?.message) {
      throw error;
    }
  }
};

export const useCreateCall = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClassroom,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classroomKeys.all });
    },
  });
};
