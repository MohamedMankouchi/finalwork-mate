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
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import { Button } from "../_components/Button/Button";
import { PlanningModal } from "./PlanningModal";

type propertiesObject = {
  id: number;
  properties: {
    address_fr: string;
    email: string;
    medias: object[];
    phone: string;
  };
};
type MapDrawerProps = {
  data?: object;
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

          <Box mt="3">
            <Text fontSize="20px" color="brand.200" fontWeight="bold">
              Services
            </Text>

            {data?.properties?.services.length === 0
              ? "No services available"
              : data?.properties?.services.map((el: object, index) => (
                  <Text key={index}> - {el.service.translations.en.name}</Text>
                ))}
          </Box>

          <Box mt="3" mb="3">
            <Text fontSize="20px" color="brand.200" fontWeight="bold" mb="2">
              Friends going to{" "}
              {data?.properties?.organization.translations.en.name}
            </Text>
            <Avatar.Group>
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                style={{
                  backgroundColor: "whitesmoke",
                  border: "2px solid #2AACE2",
                }}
              />
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=22"
                style={{
                  backgroundColor: "whitesmoke",
                  border: "2px solid #2AACE2",
                }}
              />
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=5"
                style={{
                  backgroundColor: "whitesmoke",
                  border: "2px solid #2AACE2",
                }}
              />
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=4"
                style={{
                  backgroundColor: "whitesmoke",
                  border: "2px solid #2AACE2",
                }}
              />
            </Avatar.Group>
          </Box>

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
