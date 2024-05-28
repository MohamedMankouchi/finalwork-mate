import { Center, Divider, Flex, Image, Spacer } from "@chakra-ui/react";
import { Avatar, Badge } from "antd";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";
import { IoChatbubblesOutline, IoMapOutline } from "react-icons/io5";
import {
  MdOutlineCloudDownload,
  MdOutlineForum,
  MdOutlineLockReset,
  MdOutlineNotifications,
} from "react-icons/md";
import { PiSignOutBold, PiTarget } from "react-icons/pi";
import { RiLiveLine } from "react-icons/ri";
import {
  Menu,
  MenuItem,
  Sidebar as ReactSideBar,
  SubMenu,
} from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";

import { Tables } from "../../_models/database.types";
import { useSignOut } from "../../auth/_mutations/useSignOut";
import Logo from "./../../assets/Mate.png";

export const Sidebar = ({
  user,
  notifCount,
}: {
  notifCount?: number;
  user: Tables<"users"> | null;
}) => {
  const [isCollapsed, setIscollapsed] = useState(true);
  const { mutateAsync: signOut } = useSignOut();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ReactSideBar
      backgroundColor="white"
      style={{
        borderBottomRightRadius: "10px",
        borderTopRightRadius: "10px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        padding: "4px",
      }}
      collapsed={isCollapsed}
      onMouseEnter={() => setIscollapsed(false)}
      onMouseLeave={() => setIscollapsed(true)}
    >
      <Flex flexDirection="column" h="100%">
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#EDF9FF",
                borderRadius: "10px",
                fontWeight: "bolder",
              },

              [`&:hover`]: {
                backgroundColor: "#EDF9FF",
                borderRadius: "10px",
                fontWeight: "bolder",
              },
            },
          }}
        >
          <Center justifyContent="center" p={2} mt={5} mb={10} as={Link} to="/">
            <Image src={Logo} />{" "}
          </Center>

          <MenuItem
            component={<NavLink to="/" />}
            icon={<MdOutlineForum size="25px" color="#2CABE2" />}
          >
            Forum
          </MenuItem>
          <MenuItem
            component={<NavLink to="/map" />}
            icon={<IoMapOutline size="25px" color="#2CABE2" />}
          >
            Map
          </MenuItem>
          <MenuItem
            component={<NavLink to="/classrooms" />}
            icon={
              <RiLiveLine
                size="25px"
                color="#2CABE2"
                opacity={!user ? 0.4 : 1}
              />
            }
            disabled={!user}
          >
            Classrooms
          </MenuItem>
          <MenuItem
            component={<NavLink to="/filelibrary" />}
            icon={<MdOutlineCloudDownload size="25px" color="#2CABE2" />}
          >
            File library
          </MenuItem>
          <MenuItem
            component={<NavLink to="/goals" />}
            icon={
              <PiTarget size="25px" color="#2CABE2" opacity={!user ? 0.4 : 1} />
            }
            disabled={!user}
          >
            Goals
          </MenuItem>
        </Menu>
        <Spacer />
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#EDF9FF",
                borderRadius: "10px",
                fontWeight: "bolder",
                transition: "active 1s ease-in-out",
              },

              [`&:hover`]: {
                backgroundColor: "#EDF9FF",
                borderRadius: "10px",
                fontWeight: "bolder",
              },
            },
          }}
        >
          <Divider />

          {user ? (
            <>
              <MenuItem
                component={<NavLink to="/notifications" />}
                icon={<MdOutlineNotifications size="25px" color="#2CABE2" />}
                suffix={<Badge overflowCount={10} count={notifCount} />}
              >
                Notifications
              </MenuItem>
              <SubMenu
                label={user.email}
                icon={<Avatar src={user.profile_pic} />}
              >
                <MenuItem
                  component={<NavLink to="/profile" />}
                  icon={<CgProfile size={"25px"} color="#2CABE2" />}
                >
                  Profile
                </MenuItem>

                <MenuItem
                  component={<NavLink to="/messages" />}
                  icon={<IoChatbubblesOutline size={"25px"} color="#2CABE2" />}
                >
                  Messages
                </MenuItem>

                <MenuItem
                  component={<NavLink to="/reset-password" />}
                  icon={<MdOutlineLockReset size={"25px"} color="#2CABE2" />}
                >
                  Reset password
                </MenuItem>
                <MenuItem
                  onClick={handleSignOut}
                  icon={<PiSignOutBold size={"25px"} color="red" />}
                >
                  Sign Out
                </MenuItem>
              </SubMenu>
            </>
          ) : (
            <MenuItem
              component={<NavLink to="/login" />}
              icon={<CgLogIn size="25px" color="#2CABE2" />}
            >
              Login
            </MenuItem>
          )}
        </Menu>
      </Flex>
    </ReactSideBar>
  );
};
