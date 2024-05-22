import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Avatar, Tooltip as AntTooltip } from "antd";
import { format } from "date-fns";
import { Link, Navigate, useOutletContext } from "react-router-dom";

import { Tables } from "../_models/database.types";
import { FileCard } from "../filelibrary/FileCard";
import { ForumCard } from "../forum/ForumCard";
import { useGetFriends } from "./_queries/useGetFriends";
import { useGetPlanned } from "./_queries/useGetPlanned";
import { useGetPosts } from "./_queries/useGetPosts";
import { useGetSharedFiles } from "./_queries/useGetSharedFiles";
export const Profile = () => {
  const user: Tables<"users"> = useOutletContext();
  const { data: friendsList, isLoading: friendsLoading } = useGetFriends(
    user?.id
  );

  const { data: sharedFiles, isLoading: filesLoading } = useGetSharedFiles(
    user?.id
  );

  const { data: plannings, isLoading: planningLoading } = useGetPlanned(
    user?.id
  );

  const { data: posts, isLoading: postLoading } = useGetPosts(user?.id);
  return (
    <Grid p="5" gap="5" overflow="hidden">
      {!user ? (
        <Navigate to="/login" />
      ) : postLoading || filesLoading || friendsLoading || planningLoading ? (
        <Box bg="white" p="4">
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
        </Box>
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
                  src={user.banner_pic as string}
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
                    src={user.profile_pic}
                  />
                  <Box>
                    <Heading color="brand.200">
                      {user.firstname} {user.lastname}
                    </Heading>
                    <Text color="brand.200">Student in {user.education}</Text>
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
            {/* <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Summary
              </Heading>
              <Text>
                I am a driven individual with expertise in both front-end and
                back-end development. My passion for programming motivates me
                every day to pursue innovative solutions and create seamless
                user experiences.
              </Text>
            </Box> */}

            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Additional Details
              </Heading>
              <Box>
                <Text>Email</Text>
                <Text color="brand.200">{user.email}</Text>
              </Box>

              <Box>
                <Text>Languages</Text>
                <Flex gap="1">
                  {JSON.parse(user.languages).map(
                    (el: string, index: number) => (
                      <Text color="brand.200">
                        {el}
                        {JSON.parse(user.languages).length - 1 !== index && ","}
                      </Text>
                    )
                  )}
                </Flex>
              </Box>

              <Box>
                <Text>Joined on</Text>
                <Text color="brand.200">{format(user.created_at, "PPP")}</Text>
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
                {sharedFiles?.length === 0 ? (
                  <Text>
                    {user.firstname} {user.lastname} has not shared file yet !
                  </Text>
                ) : (
                  <>
                    {sharedFiles?.map((el) => (
                      <FileCard key={el.id} data={el} />
                    ))}
                  </>
                )}
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
                {posts?.length === 0 ? (
                  <Text>
                    {user.firstname} {user.lastname} has not post any problem
                    yet !
                  </Text>
                ) : (
                  <>
                    {posts?.map((el) => (
                      <ForumCard key={el.id} data={el} />
                    ))}
                  </>
                )}
              </Grid>
            </Box>

            <Box mb="6">
              <Heading fontSize="30px" color="brand.200" mb="2">
                Planned places
              </Heading>

              {plannings?.data?.length === 0 ? (
                <Text>Nothing planned</Text>
              ) : (
                <Box w="90vw" overflow="auto" height="400px">
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Place</Th>
                          <Th>Adress</Th>
                          <Th>Date</Th>
                          <Th>From</Th>
                          <Th>Till</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {plannings?.arr?.map((el) => (
                          <Tr key={el!.id}>
                            <Td>{el?.properties.translations.en.name}</Td>
                            <Td>{el?.properties.address_fr}</Td>
                            <Td>
                              {format(
                                plannings.data?.find(
                                  (data) => data.marker_id === el!.id
                                )?.from as string,
                                "dd/MM/yyyy"
                              )}
                            </Td>
                            <Td>
                              {format(
                                plannings.data?.find(
                                  (data) => data.marker_id === el!.id
                                )?.from as string,
                                "H:mm"
                              )}
                            </Td>
                            <Td>
                              {format(
                                plannings.data?.find(
                                  (data) => data.marker_id === el!.id
                                )?.to as string,
                                "H:mm"
                              )}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            bg="white"
            p="4"
            borderRadius="10px"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <Heading color="brand.200" fontSize="18px" mb="2">
              Friends ({friendsList?.length})
            </Heading>
            <Avatar.Group
              maxPopoverTrigger="hover"
              maxCount={30}
              maxStyle={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
                fontFamily: "Gabarito, sans serif",
              }}
            >
              {friendsList?.length === 0 ? (
                <Text fontFamily="Gabarito, sans serif" fontSize="16px">
                  {user.firstname} {user.lastname} has currently no friends. Be
                  the first !
                </Text>
              ) : (
                friendsList?.map((el) => (
                  <AntTooltip
                    placement="top"
                    title={`${el!.firstname} ${el!.lastname}`}
                    style={{ fontFamily: "Gabarito, sans serif" }}
                  >
                    <Link to={`/user/${el!.id}`}>
                      <Avatar src={el?.profile_pic} />
                    </Link>
                  </AntTooltip>
                ))
              )}
            </Avatar.Group>
          </Box>
        </>
      )}
    </Grid>
  );
};
