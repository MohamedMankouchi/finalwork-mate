import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import L from "leaflet";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import {
  MapContainer,
  Marker as LeafletMarker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useOutletContext } from "react-router-dom";

import { Tables } from "../_models/database.types";
import Marker from "./../assets/Marker.png";
import { useGetMarkers } from "./_queries/useGetMarkers";
import { LocateControl } from "./LeafletControl";
import { MapDrawer } from "./MapDrawer";
import Markers from "./markers.json";

export const Map = () => {
  const [markerId, setMarkerId] = useState(0);
  const markerIcon = L.icon({
    iconSize: [32, 32],
    iconUrl: Marker,
  });

  const user: Tables<"users"> = useOutletContext();
  const { data, isLoading } = useGetMarkers();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h="100vh">
      <MapDrawer
        isOpen={isOpen}
        onClose={onClose}
        data={Markers.find((el) => el.id === markerId)}
        user_id={user?.id}
      />
      <MapContainer
        center={[50.8466, 4.3528]}
        zoom={12}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocateControl position="topleft" />
        {isLoading
          ? "loading"
          : data!.map((marker) => (
              <LeafletMarker
                key={marker.id}
                position={[
                  marker.geometry!.coordinates[0],
                  marker.geometry!.coordinates[1],
                ]}
                icon={markerIcon}
                eventHandlers={{
                  click: (e) => {
                    setMarkerId(marker.id);
                    e.target.openPopup();
                    onOpen();
                  },

                  mouseout: (e) => {
                    e.target.closePopup();
                  },

                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup closeButton={false}>
                  <Text
                    fontWeight="bold"
                    color="brand.200"
                    fontFamily="Gabarito, sans-serif"
                    fontSize="16px"
                    marginTop={"0px !important"}
                    marginBottom={"5px !important"}
                  >
                    {marker.properties.translations.en.name}
                  </Text>
                  <Flex alignItems="end" justifyContent="center" gap="1">
                    <FaStar size="20" color="orange" />
                    <Text
                      color="brand.200"
                      fontFamily="Gabarito, sans-serif"
                      fontSize="12px"
                      margin={"0px !important"}
                    >
                      {marker.properties.comments.length === 0
                        ? "0 No review"
                        : marker.properties.comments.reduce(
                            (acc, value) => acc + value.rating,
                            0
                          )}
                    </Text>
                  </Flex>
                </Popup>
              </LeafletMarker>
            ))}
      </MapContainer>
    </Box>
  );
};
