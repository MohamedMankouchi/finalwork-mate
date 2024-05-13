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
  Text,
} from "@chakra-ui/react";
import { Select } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { useToast } from "../_hooks/useToast";
import { useAddTaskGroup } from "./_mutations/useAddTaskGroup";
type CreateTaskModalProps = {
  friendsList: [];
  goal_id: number;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTaskGroupModal = ({
  isOpen,
  onClose,
  goal_id,
  friendsList,
}: CreateTaskModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      friend: [],
      title: "",
    },
  });

  const showToast = useToast();
  const { mutateAsync: addTask, isPending } = useAddTaskGroup();
  const handleAddTask = async ({ title, friend }: FieldValues) => {
    try {
      await addTask({ friend, goal_id, title });
      reset();
      showToast({
        description: "Task has been succesfully added !",
        status: "success",
        title: "Added !",
      });
      onClose();
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
        <form onSubmit={handleSubmit((data) => handleAddTask(data))}>
          <Box p={5}>
            <Heading mb="5" color="brand.200" fontSize="30px">
              Add a task
            </Heading>

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
            {errors.friends && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.friends.message as string}
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                onChange: (value) => {
                  value.target.value.length !== 0 && clearErrors("friend");
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
                  allowClear
                  placeholder="Assign to"
                  options={friendsList?.map((el) => ({
                    id: el.users.id,
                    label: el.users.email,
                    value: el.users.email,
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
              name="friend"
            />
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
                isLoading={isPending}
              >
                Add task
              </Button>
            </Flex>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};
