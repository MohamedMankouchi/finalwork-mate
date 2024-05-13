import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useDeleteTask } from "./_mutations/useDeleteTask";

export const DeleteTaskModal = ({
  id,
  isOpen,
  onClose,
}: {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { goalId } = useParams();
  const showToast = useToast();
  const { mutateAsync: deleteTask, isPending } = useDeleteTask();
  const handleDelete = async () => {
    try {
      await deleteTask({ goalId: parseInt(goalId as string), id });
      onClose();
      showToast({
        description: "Task has been successfully deleted !",
        status: "success",
        title: "Deleted !",
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
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Box p={5}>
          <Heading color="brand.200" fontFamily="30px" mb={2}>
            Are you sure ?
          </Heading>

          <Text mb={2}>This action is irreversible</Text>
          <Flex gap="3" justifyContent="end" mt="5">
            <Button
              onClick={() => {
                onClose();
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
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
