import {
  Box,
  Button,
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
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Avatar, Tooltip as AntTooltip } from "antd";
import { format } from "date-fns";
import { FaUserClock } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { MdGroupRemove } from "react-icons/md";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { Tables } from "../_models/database.types";
import { supabase } from "../database/supabase";
import { FileCard } from "../filelibrary/FileCard";
import { ForumCard } from "../forum/ForumCard";
import { useAddFriend } from "./_mutations/useAddFriend";
import { useRemoveFriend } from "./_mutations/useRemoveFriend";
import { useCheckFriends } from "./_queries/useCheckFriends";
import { useGetFriends } from "./_queries/useGetFriends";
import { useGetPlanned } from "./_queries/useGetPlanned";
import { useGetPosts } from "./_queries/useGetPosts";
import { useGetSharedFiles } from "./_queries/useGetSharedFiles";
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

  const { data: friendsList, isLoading: friendsLoading } = useGetFriends(
    id as string
  );

  const { data: plannings, isLoading: planningLoading } = useGetPlanned(
    id as string
  );

  const { data: sharedFiles, isLoading: filesLoading } = useGetSharedFiles(
    id as string
  );

  const { data: posts, isLoading: postLoading } = useGetPosts(id as string);

  const { mutateAsync: addFriend } = useAddFriend(id as string, user?.id);
  const { mutateAsync: removeFriend } = useRemoveFriend(id as string, user?.id);

  const showToast = useToast();
  const navigate = useNavigate();
  const handleMessage = async () => {
    const { data } = await supabase
      .from("chat")
      .select("*")
      .or(`user1.eq.${user.id},and(user2.eq.${user.id})`)
      .or(`user1.eq.${id},and(user2.eq.${id})`)
      .single();
    if (!data) {
      const { data, error } = await supabase
        .from("chat")
        .insert({ user1: user.id, user2: id as string })
        .select()
        .single();
      if (error) throw error;
      navigate(`/messages/${data.id}`);
      return;
    }
    navigate(`/messages/${data.id}`);
  };

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
    <Grid p="5" gap="5" overflow="hidden">
      {isLoading ||
      friendLoading ||
      friendsLoading ||
      filesLoading ||
      postLoading ||
      planningLoading ? (
        <Box bg="white" p="4">
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
        </Box>
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
                  <Button onClick={handleMessage}>
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
                  objectFit="cover"
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
                {sharedFiles?.length === 0 ? (
                  <Text>
                    {data?.firstname} {data?.lastname} has not shared file yet !
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
                    {data?.firstname} {data?.lastname} has not post any problem
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
                <Box w="90vw" overflow="auto" height={["400px", "max-content"]}>
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
                          <Tr key={el?.id}>
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
                  {data?.firstname} {data?.lastname} has currently no friends.
                  Be the first !
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
