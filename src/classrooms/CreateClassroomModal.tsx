import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import Dragger from "antd/es/upload/Dragger";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { BsKey } from "react-icons/bs";
import { CgSoftwareUpload } from "react-icons/cg";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useToggle } from "../_hooks/useToggle";
import { Tables } from "../_models/database.types";
import { useCreateCall } from "./_mutations/useCreateCall";

type CreateClassroomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  streamClient: StreamVideoClient;
};

export const CreateClassroomModal = ({
  isOpen,
  onClose,
  streamClient,
}: CreateClassroomModalProps) => {
  const { mutateAsync: createCall, isPending } = useCreateCall();
  const user: Tables<"users"> = useOutletContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      bannerImg: "",
      description: "",
      password: "",
      title: "",
    },
  });

  const showToast = useToast();

  const handleClassroom = async ({
    description,
    password,
    title,
    bannerImg,
  }: FieldValues) => {
    try {
      await createCall({
        bannerImg: bannerImg ? bannerImg.file : null,
        client: streamClient,
        description,
        password,
        title,
        user,
      });
      onClose();
      reset();
      showToast({
        description: "Classroom has been successfully created !",
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

  const [isVisible, togglePassword] = useToggle(false);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit((data) => handleClassroom(data))}>
          <Box p={5}>
            <Heading mb="5" color="brand.200" fontSize="30px">
              Create a classroom
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
            <Text
              fontSize="xs"
              ml={2}
              mb={2}
              color="brand.200"
              fontWeight="bold"
            >
              Optional
            </Text>
            {errors.password && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.password.message as string}
              </Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  {errors.password && (
                    <Text fontSize="xs" color="red" p={2} mb="-25px">
                      {errors.password.message as string}
                    </Text>
                  )}
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <BsKey />
                    </InputLeftElement>
                    {!isVisible ? (
                      <InputRightElement
                        cursor="pointer"
                        onClick={togglePassword}
                      >
                        <IoEyeOutline size="20" />
                      </InputRightElement>
                    ) : (
                      <InputRightElement
                        cursor="pointer"
                        onClick={togglePassword}
                      >
                        <IoEyeOffOutline size="20" />
                      </InputRightElement>
                    )}
                    <Input
                      onChange={onChange}
                      type={isVisible ? "text" : "password"}
                      placeholder="Password"
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
              name="password"
            />
            <Text
              fontSize="xs"
              ml={2}
              mb={2}
              mt={3}
              color="brand.200"
              fontWeight="bold"
            >
              Optional
            </Text>
            {errors.bannerImg && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.bannerImg.message as string}
              </Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Box>
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
                    maxCount={1}
                    accept="image/jpeg, image/png, image/jpg"
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
                      Click or drag file to this area to upload banner image
                    </Text>
                    <Text fontSize="xs">Max 2MB</Text>
                  </Dragger>
                </Box>
              )}
              name="bannerImg"
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
                Create classroom
              </Button>
            </Flex>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};
