import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { FaUserClock } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { MdGroupRemove } from "react-icons/md";
import { Navigate, useOutletContext, useParams } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { Tables } from "../_models/database.types";
import { ClassroomCard } from "../classrooms/ClassroomCard";
import { FileCard } from "../filelibrary/FileCard";
import { ForumCard } from "../forum/ForumCard";
import { useAddFriend } from "./_mutations/useAddFriend";
import { useRemoveFriend } from "./_mutations/useRemoveFriend";
import { useCheckFriends } from "./_queries/useCheckFriends";
import { useUserDetails } from "./_queries/useUserDetails";
export const UserProfile = () => {
  const { id } = useParams();
  const user: Tables<"users"> = useOutletContext();
  const { data, isLoading } = useUserDetails(id as string);
  const { data: friends, isLoading: friendLoading } = useCheckFriends(
    id as string,
    user?.id,
    !!user
  );

  const { mutateAsync: addFriend } = useAddFriend(id as string, user?.id);
  const { mutateAsync: removeFriend } = useRemoveFriend(id as string, user?.id);

  const showToast = useToast();
  const handleAddFriend = async () => {
    try {
      await addFriend();
      showToast({
        description: `Friend request has been sent to ${data?.firstname} ${data?.lastname}`,
        status: "success",
        title: "Success",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(friends!.id);

      showToast({
        description: `${data?.firstname} ${data?.lastname} has been removed from your friends`,
        status: "success",
        title: "Success",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };
  return (
    <Grid p="5" gap="5">
      {isLoading || friendLoading ? (
        "Loading"
      ) : !isLoading && !data ? (
        "User doesnt exists "
      ) : !isLoading && !friendLoading && data?.id === user?.id ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <Box>
            <Box
              borderRadius="10px"
              boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              h="300px"
              bg="white"
              position="relative"
            >
              {friends && friends.status === "accepted" ? (
                <Flex
                  gap="3"
                  position="absolute"
                  top="70%"
                  right="0"
                  transform="translate(-50%,-50%)"
                >
                  <Button>
                    <FiSend color="2CAEE2C" />
                  </Button>
                  <Button
                    bg="red"
                    color="white"
                    variant="solid"
                    padding="16px"
                    borderRadius={5}
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px "
                    _hover={{ bg: "darkred" }}
                    onClick={handleRemoveFriend}
                  >
                    <MdGroupRemove />
                  </Button>
                </Flex>
              ) : friends && friends.status === "pending" ? (
                <Tooltip label="Friend request pending" hasArrow>
                  <Flex
                    gap="3"
                    position="absolute"
                    top="70%"
                    right="0"
                    transform="translate(-50%,-50%)"
                  >
                    <Button
                      color="white"
                      variant="solid"
                      padding="16px"
                      borderRadius={5}
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px "
                      isDisabled
                      bg="brand.200"
                      _hover={{ bg: "#008ECC" }}
                    >
                      <FaUserClock />
                    </Button>
                  </Flex>
                </Tooltip>
              ) : (
                <Flex
                  gap="3"
                  position="absolute"
                  top="70%"
                  right="0"
                  transform="translate(-50%,-50%)"
                >
                  <Button
                    bg="brand.200"
                    color="white"
                    variant="solid"
                    padding="16px"
                    borderRadius={5}
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px "
                    _hover={{ bg: "#008ECC" }}
                    isDisabled={!user}
                    onClick={handleAddFriend}
                  >
                    <IoMdPersonAdd />
                  </Button>
                </Flex>
              )}

              <Box h="160px" borderRadius="15px">
                <Image
                  src={data!.banner_pic as string}
                  h="100%"
                  w="100%"
                  borderRadius="10px"
                />
              </Box>
              <Box
                position="absolute"
                top="60%"
                transform="translate(10%,-50%)"
                mt="2"
              >
                <Flex alignItems="end" gap="5">
                  <Avatar
                    style={{
                      border: "3px solid white",
                      height: "120px",
                      width: "120px",
                    }}
                    size="large"
                    src={data?.profile_pic}
                  />
                  <Box>
                    <Heading color="brand.200">
                      {data?.firstname} {data?.lastname}
                    </Heading>
                    <Text color="brand.200">Student in {data?.education}</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>

          <Box
            bg="white"
            p="4"
            borderRadius="10px"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Summary
              </Heading>
              <Text>
                I am a driven individual with expertise in both front-end and
                back-end development. My passion for programming motivates me
                every day to pursue innovative solutions and create seamless
                user experiences.
              </Text>
            </Box>

            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Additional Details
              </Heading>
              <Box>
                <Text>Email</Text>
                <Text color="brand.200">{data?.email}</Text>
              </Box>

              <Box>
                <Text>Languages</Text>
                <Flex gap="1">
                  {JSON.parse(data!.languages).map(
                    (el: string, index: number) => (
                      <Text color="brand.200">
                        {el}
                        {JSON.parse(data!.languages).length - 1 !== index &&
                          ","}
                      </Text>
                    )
                  )}
                </Flex>
              </Box>

              <Box>
                <Text>Joined</Text>
                <Text color="brand.200">{format(data!.created_at, "PPP")}</Text>
              </Box>
            </Box>
          </Box>

          <Box
            bg="white"
            p="4"
            borderRadius="10px"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Shared files
              </Heading>
              <Grid
                templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
                gap="4"
              >
                {/* <FileCard />
                  <FileCard />
                  <FileCard />
                  <FileCard /> */}
              </Grid>
            </Box>

            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Posts
              </Heading>
              <Grid
                templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
                gap="4"
              >
                {/* <ForumCard />
                  <ForumCard /> */}
              </Grid>
            </Box>

            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Events
              </Heading>
              <Grid
                templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
                gap="4"
              >
                <ClassroomCard />
                <ClassroomCard />
              </Grid>
            </Box>
          </Box>
          <Box
            bg="white"
            p="4"
            borderRadius="10px"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <Heading color="brand.200" fontSize="18px" mb="2">
              Friends (24)
            </Heading>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=22" />
          </Box>
        </>
      )}
    </Grid>
  );
};
