import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import { Button } from "../_components/Button/Button";
import { useFriendsPlanned } from "./_queries/useFriendsPlanned";
import { PlanningModal } from "./PlanningModal";

type MapDrawerProps = {
  data?: {
    id: number;
    properties: {
      address_fr: string;
      email: string;
      medias: {
        file: {
          url: string;
        };
        is_main_image: boolean;
      }[];
      organization: {
        translations: {
          en: {
            name: string;
          };
        };
      };
      phone: string;
      schedules: {
        lines: {
          closinghour: string;
          is_active: boolean;
          openinghour: string;
          weekday: number;
        }[];
      }[];
      services: {
        service: {
          translations: {
            en: {
              name: string;
            };
          };
        };
      }[];
    };
  };
  isOpen: boolean;
  onClose: () => void;

  user_id?: string;
};
export const MapDrawer = ({
  isOpen,
  onClose,
  data,
  user_id,
}: MapDrawerProps) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const { data: friends, isLoading: friendsLoading } = useFriendsPlanned(
    user_id as string,
    data?.id as number,
    !!user_id as boolean
  );

  return (
    <Box>
      <PlanningModal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        marker_id={data?.id}
        user_id={user_id as string}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        closeOnOverlayClick={false}
        size="sm"
        closeOnEsc
      >
        <DrawerOverlay />
        <DrawerContent
          p="4"
          overflowY="auto"
          borderTopLeftRadius="10px"
          borderBottomLeftRadius="10px"
        >
          <DrawerCloseButton left="2" />

          {data?.properties?.medias.length !== 0 ? (
            <Image
              mt="8"
              h="140px"
              objectFit="cover"
              borderRadius="20px"
              src={
                data?.properties?.medias?.find((el) => el.is_main_image)?.file
                  ?.url
              }
            />
          ) : (
            <Image
              mt="8"
              h="140px"
              objectFit="cover"
              borderRadius="20px"
              src="https://www.legrand.be/modules/custom/legrand_ecat/assets/img/no-image.png"
            />
          )}

          <Box mt="3">
            <Text fontSize="20px" color="brand.200" fontWeight="bold">
              About
            </Text>
            <Flex alignItems="center" gap="3" mb="3">
              <IoSchool size={20} color="2AACE2" />
              <Text>{data?.properties?.organization.translations.en.name}</Text>
            </Flex>
            <Flex alignItems="center" gap="3" mb="3">
              <FaLocationDot size={20} color="2AACE2" />
              <Text>{data?.properties?.address_fr}</Text>
            </Flex>
            <Flex alignItems="center" gap="3" mb="3">
              <MdEmail size={20} color="2AACE2" />
              <Text>{data?.properties?.email}</Text>
            </Flex>

            <Flex alignItems="center" gap="3" mb="3">
              <FaPhone size={20} color="2AACE2" />
              <Text>{data?.properties?.phone}</Text>
            </Flex>
          </Box>

          <Box mt="3">
            <Text fontSize="20px" color="brand.200" fontWeight="bold">
              Openinghours
            </Text>

            <Text>
              Monday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 1
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 1
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 1
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
            <Text>
              Tuesday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 2
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 2
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 2
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
            <Text>
              Wednesday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 3
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 3
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 3
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
            <Text>
              Thursday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 4
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 4
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 4
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
            <Text>
              Friday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 5
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 5
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 5
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
            <Text>
              Saturday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 6
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 6
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 6
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
            <Text>
              Sunday:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!data?.properties?.schedules[0].lines.find(
                  (el) => el.weekday === 7
                ) ? (
                  "Closed"
                ) : (
                  <>
                    {`${
                      data?.properties?.schedules[0].lines.find(
                        (el) => el.weekday === 7
                      )?.openinghour
                    } -
                  ${
                    data?.properties?.schedules[0].lines.find(
                      (el) => el.weekday === 7
                    )?.closinghour
                  }`}
                  </>
                )}
              </span>
            </Text>
          </Box>

          <Box mt="3" mb={3}>
            <Text fontSize="20px" color="brand.200" fontWeight="bold">
              Services
            </Text>

            {data?.properties?.services.length === 0
              ? "No services available"
              : data?.properties?.services.map((el, index: number) => (
                  <Text key={index}> - {el.service.translations.en.name}</Text>
                ))}
          </Box>

          {friends?.flat().length !== 0 &&
            friends?.length !== undefined &&
            !friendsLoading && (
              <Box mb="3">
                <Text
                  fontSize="20px"
                  color="brand.200"
                  fontWeight="bold"
                  mb="2"
                >
                  Friends going to{" "}
                  {data?.properties?.organization.translations.en.name}
                </Text>
                <Avatar.Group>
                  {friends?.map((el) => (
                    <Tooltip
                      hasArrow
                      label={
                        el?.from
                          ? `Going on ${format(el?.from, "dd/MM/yyyy hh:mm")}`
                          : ""
                      }
                    >
                      <Avatar src={el?.users?.profile_pic} />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </Box>
            )}

          {!user_id ? (
            <Tooltip
              w="100%"
              label="Log yourself in to plan a day"
              placement="auto"
              hasArrow
            >
              <Box w="100%">
                <Button
                  value="Plan a day"
                  onClick={() => onOpenModal()}
                  isDisabled
                />
              </Box>
            </Tooltip>
          ) : (
            <Box>
              <Button
                value="Plan a day"
                onClick={() => onOpenModal()}
                isDisabled={false}
              />
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
