import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";

import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { Locate }: any = L.Control;

interface P extends L.ControlOptions {}

function createLocateInstance(props: P) {
  const instance = new Locate({
    enableHighAccuracy: true,
    positon: props,
  });
  return instance;
}

export const LocateControl = createControlComponent(createLocateInstance);
