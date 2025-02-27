"use client";

import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { node } from "@/types";
import { MOUSE } from "@/Enums/mouseEventsEnums";

import { setMouseType } from "@/lib/features/workspaceSlice/boardDetailsSlice";

import SmallSelectedObject from "./smallSelectedObj";

// Define the props interface for the SelectedObj component
interface selectedObjProps {
  selectedObj: node;
  id: string;
  setObj: (obj: node | null) => void;
  setTempObject: (tempObject: Array<node>) => void;
  xref: number;
  yref: number;
  scale: number;
}

// Define the SelectedObj functional component
const SelectedObj: React.FC<selectedObjProps> = (props) => {
  const dispatch = useAppDispatch();

  // Calculate the coordinates for the selected object
  let x1 = (props.selectedObj.body.Essentials.x + props.xref) * props.scale;
  let y1 = (props.selectedObj.body.Essentials.y + props.yref) * props.scale;
  let x2 = x1 + props.selectedObj.body.Essentials.width * props.scale;
  let y2 = y1 + props.selectedObj.body.Essentials.height * props.scale;

  if (x1 > x2) [x1, x2] = [x2, x1];
  if (y1 > y2) [y1, y2] = [y2, y1];

  // Handle mouse down event
  const handleMouseDown = (num: number) => {
    dispatch(setMouseType(num));
    props.setTempObject([]);
    props.setObj(props.selectedObj);
  };

  // Handle reset event
  const handleReset = () => {
    dispatch(setMouseType(MOUSE.NONE));
    props.setObj(null);
  };

  // Define the coordinates for each small selected object
  const cubes: { [key: number]: (w: number) => [number, number] } = {
    [MOUSE.TOPLEFT]: (w: number) => [x1 - w, y1 - w],
    [MOUSE.TOPMIDDLE]: (w: number) => [(x1 + x2) / 2 - w, y1 - w],
    [MOUSE.TOPRIGHT]: (w: number) => [x2 - w, y1 - w],
    [MOUSE.MIDDLELEFT]: (w: number) => [x1 - w, (y1 + y2) / 2 - w],
    [MOUSE.MIDDLERIGHT]: (w: number) => [x2 - w, (y1 + y2) / 2 - w],
    [MOUSE.BOTTOMLEFT]: (w: number) => [x1 - w, y2 - w],
    [MOUSE.BOTTOMMIDDLE]: (w: number) => [(x1 + x2) / 2 - w, y2 - w],
    [MOUSE.BOTTOMRIGHT]: (w: number) => [x2 - w, y2 - w],
  };

  return (
    // Render the small selected objects
    <>
      {Array.from(
        { length: 8 },
        (_, i) => i + MOUSE.SELECTEDEVENTSTART + 1
      ).map((i) => (
        <SmallSelectedObject
          key={i}
          id={props.id}
          index={i}
          type={i}
          cood={cubes[i]}
          handleMouseDown={() => handleMouseDown(i)}
          handleReset={() => handleReset()}
        />
      ))}
    </>
  );
};

export default SelectedObj;
