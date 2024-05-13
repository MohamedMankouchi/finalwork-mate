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
import { useParams } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useEditTask } from "./_mutations/useEditTask";
type EditTaskModalProps = {
  id: number;
  isOpen: boolean;
  name: string;
  onClose: () => void;
};

export const EditTaskModal = ({
  isOpen,
  onClose,
  name,
  id,
}: EditTaskModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: name,
    },
  });

  const showToast = useToast();
  const { goalId } = useParams();
  const { mutateAsync: editTask, isPending } = useEditTask();
  const handleUpdateTask = async ({ title }: FieldValues) => {
    try {
      await editTask({ goalId: parseInt(goalId as string), id, title });
      showToast({
        description: "Task has been succesfully updated !",
        status: "success",
        title: "Updated !",
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
        <form onSubmit={handleSubmit((data) => handleUpdateTask(data))}>
          <Box p={5}>
            <Heading mb="5" color="brand.200" fontSize="30px">
              Edit task
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
                      defaultValue={name}
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
                Edit task
              </Button>
            </Flex>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};
