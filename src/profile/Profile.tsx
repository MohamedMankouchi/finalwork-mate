import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";

import { useCurrentUser } from "../auth/_queries/useCurrentUser";
import { ClassroomCard } from "../classrooms/ClassroomCard";
import { FileCard } from "../filelibrary/FileCard";
import { ForumCard } from "../forum/ForumCard";
export const Profile = () => {
  const { data } = useCurrentUser();

  return (
    <Grid p="5" gap="5">
      {!data ? (
        <Navigate to="/login" />
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
              <Flex
                gap="3"
                position="absolute"
                top="70%"
                right="0"
                transform="translate(-50%,-50%)"
              >
                {" "}
              </Flex>
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
