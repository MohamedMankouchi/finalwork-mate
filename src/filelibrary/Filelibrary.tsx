import {
  Box,
  Flex,
  Grid,
  Heading,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Skeleton } from "antd";
import { motion } from "framer-motion";
import Masonry from "react-layout-masonry";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { Button } from "../_components/Button/Button";
import { Search } from "../_components/Input/Search";
import { Tables } from "../_models/database.types";
import { useGetFiles } from "./_queries/useGetFiles";
import { AddFileModal } from "./AddFileModal";
import { FileCard } from "./FileCard";

export const Filelibrary = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const user: Tables<"users"> = useOutletContext();
  const searchFilter = searchParams.get("search") ?? "";
  const { data, isLoading } = useGetFiles();
  return (
    <Box p="5">
      <AddFileModal onClose={onClose} isOpen={isOpen} user_id={user?.id} />
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="end" gap={1}>
          <Heading color="black">File library</Heading>
          <Box
            h="10px"
            borderRadius="50px"
            w="10px"
            bg="brand.200"
            mb={2.5}
          ></Box>
        </Flex>
        {!user ? (
          <Tooltip
            label="Log yourself in to share files"
            placement="auto"
            hasArrow
          >
            <Box>
              <Button value="Add a file" onClick={() => onOpen()} isDisabled />
            </Box>
          </Tooltip>
        ) : (
          <Box>
            <Button value="Add a file" onClick={() => onOpen()} />
          </Box>
        )}
      </Flex>

      <Flex mt="12" justifyContent="center">
        <Box w="650px">
          <Search
            searchFilter={searchFilter}
            setSearchParam={setSearchParams}
          />
        </Box>
      </Flex>
      {isLoading ? (
        <Grid
          mt="12"
          templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
          gap="4"
        >
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>{" "}
          <Box
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="10px"
            bg="white"
            p="2"
          >
            <Skeleton active />{" "}
          </Box>
        </Grid>
      ) : (
        <Masonry
          columns={{ 1024: 2, 1090: 3, 640: 1, 768: 2 }}
          gap={15}
          style={{ marginTop: "48px" }}
          as={motion.div}
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          {data
            ?.filter(
              (file) =>
                file.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                file.description
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase()) ||
                file
                  .users!.firstname.toLowerCase()
                  .includes(searchFilter.toLowerCase()) ||
                file
                  .users!.lastname.toLowerCase()
                  .includes(searchFilter.toLowerCase())
            )
            ?.map((file) => (
              <FileCard key={file.id} data={file} />
            ))}
        </Masonry>
      )}
    </Box>
  );
};
