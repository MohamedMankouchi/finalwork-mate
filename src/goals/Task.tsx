import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Checkbox } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useParams } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { Tables } from "../_models/database.types";
import { useConfirmTask } from "./_mutations/useConfirmTask";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { EditTaskModal } from "./EditTaskModal";

export const Task = ({ name, assigned_to, isDone, id }: Tables<"todos">) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const { mutateAsync: confirmTask } = useConfirmTask();
  const showToast = useToast();
  const { goalId } = useParams();
  const handleConfirm = async () => {
    try {
      await confirmTask({ goalId: parseInt(goalId as string), id });
      showToast({
        description: "Task has been marked as done !",
        status: "success",
        title: "Done !",
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
    <Box mb="6">
      <DeleteTaskModal isOpen={modalIsOpen} onClose={modalOnClose} id={id} />
      <EditTaskModal onClose={onClose} name={name} isOpen={isOpen} id={id} />
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="4">
          <Checkbox
            checked={isDone as boolean}
            onClick={handleConfirm}
            disabled={isDone as boolean}
          />
          <Box>
            <Text
              textDecorationLine={isDone ? "line-through" : "none"}
              fontWeight="bold"
            >
              {name}
            </Text>
            <Text
              fontWeight="bold"
              fontSize="12px"
              textDecorationLine={isDone ? "line-through" : "none"}
            >
              Assigned to: {""}
              <span style={{ color: "#2aace2" }}>{assigned_to}</span>
            </Text>
          </Box>
        </Flex>

        {!isDone && (
          <Flex alignItems="center" gap="4">
            <TbEdit size={25} onClick={onOpen} cursor="pointer" />
            <MdDeleteOutline
              size={25}
              color="red"
              cursor="pointer"
              onClick={modalOnOpen}
            />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
