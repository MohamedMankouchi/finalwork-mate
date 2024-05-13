import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  InputGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Dragger from "antd/es/upload/Dragger";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { CgSoftwareUpload } from "react-icons/cg";
import { useOutletContext } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { Tables } from "../_models/database.types";
import { useReplyQuestion } from "./_mutations/useReplyQuestion";

type ReplyQuestionModalProps = {
  forumId: string;
  isOpen: boolean;
  onClose: () => void;
};
export const ReplyQuestionModal = ({
  isOpen,
  onClose,
  forumId,
}: ReplyQuestionModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      description: "",
      file: "",
    },
  });
  const user: Tables<"users"> = useOutletContext();
  const showToast = useToast();
  const { mutateAsync: replyQuestion, isPending } = useReplyQuestion(forumId);
  const handleForm = async ({ description, file }: FieldValues) => {
    try {
      await replyQuestion({
        file: file?.file ?? null,
        forum_id: forumId,
        message: description,
        user_id: user.id,
      });
      reset();
      onClose();
      showToast({
        description: "Your reply has been successfully sent !",
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
    <div>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit((data) => handleForm(data))}>
            <Box p={5}>
              <Heading mb="5" color="brand.200" fontSize="30px">
                Reply
              </Heading>
              {errors.description && (
                <Text fontSize="xs" color="red" p={2}>
                  {errors.description.message as string}
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
                      <Textarea
                        onChange={onChange}
                        placeholder="Description"
                        borderRadius="10px"
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
                name="description"
              />

              {errors.files && (
                <Text fontSize="xs" color="red" p={2}>
                  {errors.files.message as string}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <>
                    <Dragger
                      onChange={onChange}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        fontFamily: "Gabarito, sans serif",
                      }}
                      height={110}
                      multiple={false}
                      beforeUpload={(file) => {
                        const isLt2M = file.size / 1024 / 1024 < 2;
                        if (!isLt2M) {
                          return true;
                        }
                        return false;
                      }}
                    >
                      <Center className="ant-upload-drag-icon">
                        <CgSoftwareUpload size="35" color="#2AACE2" />
                      </Center>
                      <Text className="ant-upload-text">
                        Click or drag file to this area to upload
                      </Text>
                      <Text fontSize="xs">Max 1 file (2MB)</Text>
                    </Dragger>
                  </>
                )}
                name="file"
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
                  Reply
                </Button>
              </Flex>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
