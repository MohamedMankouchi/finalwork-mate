import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { useToast } from "../_hooks/useToast";
import { Tables } from "../_models/database.types";
import { useGetFriends } from "../profile/_queries/useGetFriends";
import { getUserById } from "../profile/_queries/useUserDetails";
import { useCreateGroupGoal } from "./_mutations/useCreateGroupGoal";
import { useCreatePrivateGoal } from "./_mutations/useCreatePrivateGoal";
type CreateGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user_id: string;
};

export const CreateGoalModal = ({
  isOpen,
  onClose,
  user_id,
}: CreateGoalModalProps) => {
  const { data = [], isFetched } = useGetFriends(user_id);
  const [friendsList, setFriendsList] = useState<Tables<"users">[]>();

  useEffect(() => {
    if (data?.length !== 0) {
      data?.forEach(async (el) => {
        if (el.receiver === user_id) {
          return await getUserById(el.sender).then((data) =>
            setFriendsList((prev) => [...prev, data])
          );
        }
        if (el.sender === user_id) {
          return await getUserById(el.receiver).then((data) =>
            setFriendsList((prev) => [...prev, data])
          );
        }
      });
    }

    setFriendsList([]);
  }, [isFetched]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    getValues,
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      friends: [],
      from: "",
      title: "",
      to: "",
    },
  });

  const { mutateAsync: createPrivateGoal, isPending } = useCreatePrivateGoal();
  const { mutateAsync: createGroupGoal, isPending: isLoading } =
    useCreateGroupGoal();

  const showToast = useToast();

  const handleGoal = async ({
    from,
    to,
    friends,
    title,
    type,
  }: FieldValues) => {
    reset();
    try {
      if (type === "private") {
        await createPrivateGoal({ from, title, to, user_id });
        onClose();
        showToast({
          description: "Your private goal has been successfully made !",
          status: "success",
          title: "Success",
        });
      }

      if (type === "group") {
        await createGroupGoal({ friends, from, title, to, user_id });
        onClose();
        showToast({
          description: "Your group goal has been successfully made !",
          status: "success",
          title: "Success",
        });
      }
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit((data) => handleGoal(data))}>
          <Box p={5}>
            <Heading mb="5" color="brand.200" fontSize="30px">
              Create a goal
            </Heading>

            {errors.type && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.type.message as string}
              </Text>
            )}
            <Controller
              defaultValue="private"
              rules={{
                required: "This field is mandatory",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <RadioGroup
                    defaultValue="private"
                    mb={4}
                    p={1}
                    onChange={onChange}
                  >
                    <Stack spacing={4} direction="row">
                      <Radio value="private">Private</Radio>
                      <Radio value="group">Group</Radio>
                    </Stack>
                  </RadioGroup>
                </>
              )}
              name="type"
            />
            {errors.title && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.title.message as string}
              </Text>
            )}
            <Controller
              rules={{
                required: "This field is mandatory",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <InputGroup mb="4">
                    <Input
                      onChange={onChange}
                      type="text"
                      placeholder="Title"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{
                        color: "brand.200",
                        fontWeight: "bold",
                      }}
                    />
                  </InputGroup>
                </>
              )}
              name="title"
            />

            {errors.from && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.from.message as string}
              </Text>
            )}
            <Controller
              rules={{
                onChange: (value) => {
                  value.target.value <= getValues("to") && clearErrors("to");
                },
                required: "This field is mandatory",
                validate: (value) =>
                  value <= getValues("to") || "Please enter a valid date",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <Text
                    fontSize="xs"
                    ml={2}
                    color="brand.200"
                    fontWeight="bold"
                  >
                    Start date
                  </Text>
                  <InputGroup mb="4">
                    <Input
                      onChange={onChange}
                      type="date"
                      placeholder="date"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                    />
                  </InputGroup>
                </>
              )}
              name="from"
            />

            {errors.to && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.to.message as string}
              </Text>
            )}
            <Controller
              rules={{
                onChange: (value) => {
                  value.target.value >= getValues("from") &&
                    clearErrors("from");
                },
                required: "This field is mandatory",
                validate: (value) =>
                  value >= getValues("from") || "Please enter a valid date",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <Text
                    fontSize="xs"
                    ml={2}
                    color="brand.200"
                    fontWeight="bold"
                  >
                    End date
                  </Text>
                  <InputGroup>
                    <Input
                      onChange={onChange}
                      type="date"
                      placeholder="date"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                      mb={6}
                    />
                  </InputGroup>
                </>
              )}
              name="to"
            />
            {watch("type") === "group" && (
              <Box w="100%">
                {errors.friends && (
                  <Text fontSize="xs" color="red" p={2}>
                    {errors.friends.message as string}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    onChange: (value) => {
                      value.target.value.length !== 0 && clearErrors("friends");
                    },
                    required: "This field is mandatory ",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      notFoundContent={<Text color="black">No friends :(</Text>}
                      size="large"
                      dropdownStyle={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        fontFamily: "Gabarito, sans serif",
                        zIndex: "3000",
                      }}
                      variant="filled"
                      mode="multiple"
                      allowClear
                      placeholder="Friends"
                      options={friendsList?.map((el) => ({
                        id: el.id,
                        label: el.email,
                        value: el.email,
                      }))}
                      style={{
                        fontFamily: "Gabarito, sans serif",
                        height: "40px",
                        width: "100%",
                      }}
                      onChange={(e) => onChange(e)}
                      value={value}
                    />
                  )}
                  name="friends"
                />
              </Box>
            )}
            <Flex gap="3" justifyContent="end" mt="5">
              <Button
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                bg="brand.200"
                color="white"
                _hover={{ bg: "#008ECC" }}
                type="submit"
                isLoading={isPending || isLoading}
              >
                Create goal
              </Button>
            </Flex>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};
