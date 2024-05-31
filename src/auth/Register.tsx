import "./Register.css";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  GetProp,
  Image,
  Result,
  Select,
  Steps,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { Link, Navigate, useOutletContext } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useToggle } from "../_hooks/useToggle";
import Languages from "./../Languages/languages.json";
import { useCreateUser } from "./_mutations/useCreateUser";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const Register = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    trigger,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      education: "",
      email: "",
      firstname: "",
      languages: [],
      lastname: "",
      password: "",
    },
  });
  const showToast = useToast();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [current, setCurrent] = useState(0);
  const [isVisible, togglePassword] = useToggle(false);
  const { mutateAsync: createUser, isPending } = useCreateUser();
  const [profilePicUpload, setProfilePicUpload] = useState(true);
  const [bannerPicUpload, setBannerPicUpload] = useState(true);

  const steps = [
    {
      content: (
        <Flex p="5" flexDirection="column" gap="5">
          <Controller
            control={control}
            rules={{
              onChange: (value) => {
                value.target.value !== "" && clearErrors("firstname");
              },
              required: "This field is mandatory",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="Firstname"
                borderRadius="50px"
                variant="styled"
                boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                _placeholder={{
                  color: "brand.200",
                  fontWeight: "bold",
                }}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            )}
            name="firstname"
          />
          <Controller
            control={control}
            rules={{
              onChange: (value) => {
                value.target.value !== "" && clearErrors("lastname");
              },
              required: "This field is mandatory",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="Lastname"
                borderRadius="50px"
                variant="styled"
                boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                _placeholder={{
                  color: "brand.200",
                  fontWeight: "bold",
                }}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            )}
            name="lastname"
          />

          <Controller
            control={control}
            rules={{
              onChange: (value) => {
                value.target.value !== "" && clearErrors("education");
              },
              required: "This field is mandatory",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="Education"
                borderRadius="50px"
                variant="styled"
                boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                _placeholder={{
                  color: "brand.200",
                  fontWeight: "bold",
                }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
            name="education"
          />

          <Controller
            control={control}
            rules={{
              onChange: (value) => {
                value.target.value !== "" && clearErrors("firstname");
              },
              required: "This field is mandatory",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                notFoundContent={<Text color="black">Language not found</Text>}
                size="large"
                dropdownStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  fontFamily: "Gabarito, sans serif",
                }}
                variant="filled"
                mode="multiple"
                allowClear
                placeholder="Preferred languages"
                options={Languages.map((el) => {
                  return { label: el.label, value: el.label };
                })}
                style={{ fontFamily: "Gabarito, sans serif", height: "40px" }}
                onChange={(e) => onChange(e)}
                value={value}
              />
            )}
            name="languages"
          />
          <Flex gap="2" justifyContent="end" mt="3">
            <Button
              isDisabled={watch([
                "firstname",
                "lastname",
                "education",
                "languages",
              ]).some((el) => el === "" || el.length == 0)}
              bg="brand.200"
              color="white"
              _hover={{ bg: "#008ECC" }}
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      ),

      title: "About yourself",
    },
    {
      content: (
        <Flex p="5" flexDirection="column" gap="5">
          <Controller
            control={control}
            rules={{
              onChange: () => {
                trigger("email");
              },
              pattern: {
                message: "Enter a valid email",
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              },
              required: "This field is mandatory",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {errors.email && (
                  <Text fontSize="xs" p="2" marginBottom="-20px" color="red">
                    {errors.email.message as string}
                  </Text>
                )}
                <Input
                  type="email"
                  placeholder="Email"
                  borderRadius="50px"
                  variant="styled"
                  boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                />
              </>
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: "This field is mandatory",
            }}
            render={({ field: { onChange, value } }) => (
              <Box>
                <InputGroup>
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
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                    borderRadius="50px"
                    variant="styled"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                  />
                </InputGroup>
              </Box>
            )}
            name="password"
          />

          <Flex gap="2" justifyContent="end" mt="3">
            <Button
              onClick={() => {
                prev();
              }}
            >
              Previous
            </Button>
            <Button
              isDisabled={
                watch(["email", "password"]).some((el) => el === "") ||
                !!errors.email
              }
              bg="brand.200"
              color="white"
              _hover={{ bg: "#008ECC" }}
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      ),

      title: "Credentials",
    },
    {
      content: (
        <Box position="relative">
          <Flex justifyContent="center" gap="6">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Upload
                  listType="picture-circle"
                  maxCount={1}
                  beforeUpload={(file) => {
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      setProfilePicUpload(false);
                      return true;
                    }
                    setProfilePicUpload(true);
                    return false;
                  }}
                  onPreview={handlePreview}
                  onChange={(e) => onChange(e.file)}
                  defaultFileList={value && [value]}
                  accept="image/png, image/jpeg"
                >
                  {(!value || value?.status) && "+ Profile"}
                </Upload>
              )}
              name="profilePic"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={(file) => {
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      setBannerPicUpload(false);
                      return true;
                    }
                    setBannerPicUpload(true);
                    return false;
                  }}
                  onPreview={handlePreview}
                  onChange={(e) => onChange(e.file)}
                  defaultFileList={value && [value]}
                  accept="image/png, image/jpeg"
                >
                  {(!value || value?.status) && "+ Banner"}
                </Upload>
              )}
              name="bannerPic"
            />
          </Flex>

          <Flex gap="2" justifyContent="end" mt="3">
            <Button
              onClick={() => {
                prev();
              }}
            >
              Previous
            </Button>
            <Button
              bg="brand.200"
              color="white"
              _hover={{ bg: "#008ECC" }}
              type="submit"
              isLoading={isPending}
              isDisabled={!profilePicUpload || !bannerPicUpload}
            >
              Create account
            </Button>
          </Flex>
          <Text position="absolute" bottom="0" fontSize="xs">
            Max file size 2MB
          </Text>
        </Box>
      ),
      title: "Pictures",
    },

    {
      content: (
        <Box>
          <Result
            style={{ fontFamily: "Gabarito, sans serif" }}
            status="success"
            icon={
              <Center>
                <MdMarkEmailRead size="60" color="#2aace2" />
              </Center>
            }
            title="Your account has been successfully made !"
            subTitle="To continue on the Mate-platform please check your email for verification"
            extra={[
              <Button as={Link} to="/login" key={0}>
                Back to login
              </Button>,
              <Button
                key={1}
                _hover={{ bg: "#008ECC" }}
                bg="brand.200"
                color="white"
                as={Link}
                to="https://mail.google.com/"
                target="_blank"
              >
                Verify email
              </Button>,
            ]}
          />
        </Box>
      ),
      title: "Email verification",
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleForm = async ({
    education,
    email,
    firstname,
    languages,
    lastname,
    password,
    profilePic,
    bannerPic,
  }: FieldValues) => {
    try {
      await createUser({
        bannerPic,
        education,
        email,
        firstname,
        languages,
        lastname,
        password,
        profilePic,
      });
      next();
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };

  const user = useOutletContext();

  return (
    <Box p="5">
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <Flex alignItems="end" gap={1}>
            <Heading color="black">Register</Heading>
            <Box
              h="10px"
              borderRadius="50px"
              w="10px"
              bg="brand.200"
              mb={2.5}
            ></Box>
          </Flex>{" "}
          <Flex
            justifyContent="center"
            gap="5"
            mt="12"
            h="max-content"
            alignItems="center"
            height="90%"
          >
            <Flex
              flexDirection="column"
              gap="5"
              borderRadius="10px"
              boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              bg="white"
              p="5"
              w="100%"
            >
              <Steps
                style={{ fontFamily: "Gabarito, sans serif" }}
                current={current}
                items={items}
              />

              <form onSubmit={handleSubmit((data) => handleForm(data))}>
                {current === 0 && <Box>{steps[0].content}</Box>}
                {current === 1 && <Box>{steps[1].content}</Box>}
                {current === 2 && <Box>{steps[2].content}</Box>}
                {current === 3 && <Box>{steps[3].content}</Box>}
              </form>
            </Flex>
          </Flex>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
                onVisibleChange: (visible) => setPreviewOpen(visible),
                visible: previewOpen,
              }}
              src={previewImage}
            />
          )}
        </>
      )}
    </Box>
  );
};
