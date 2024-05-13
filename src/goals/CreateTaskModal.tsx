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
import { Controller, FieldValues, useForm } from "react-hook-form";

import { useToast } from "../_hooks/useToast";
import { useAddTask } from "./_mutations/useAddTask";
type CreateTaskModalProps = {
  goal_id: number;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTaskModal = ({
  isOpen,
  onClose,
  goal_id,
}: CreateTaskModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  const showToast = useToast();
  const { mutateAsync: addTask, isPending } = useAddTask();
  const handleAddTask = async ({ title }: FieldValues) => {
    try {
      await addTask({ goal_id, title });
      showToast({
        description: "Task has been succesfully added !",
        status: "success",
        title: "Added !",
      });
      onClose();
      reset();
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
