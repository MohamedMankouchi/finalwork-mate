import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
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

import { useToast } from "../_hooks/useToast";
import { useAddFile } from "./_mutations/useAddFile";

type CreateQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user_id?: string;
};
export const AddFileModal = ({
  isOpen,
  onClose,
  user_id,
}: CreateQuestionModalProps) => {
  const { mutateAsync: addFile, isPending } = useAddFile();
  const {
    handleSubmit,
    control,
    formState: { errors },

    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      description: "",
      files: "",
      title: "",
    },
  });
  const showToast = useToast();
  const handleForm = async ({ title, description, files }: FieldValues) => {
    try {
      await addFile({
        description,
        file: files.file,
        title,
        user_id: user_id as string,
      });
      reset();
      onClose();
      showToast({
        description: "Your file has been successfully uploaded !",
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
                Share a file
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
                rules={{
                  required: "This field is mandatory",
                }}
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
                      maxCount={1}
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
                name="files"
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
                  Share
                </Button>
              </Flex>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
