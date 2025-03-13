"use client";

import React from "react";

// Define the props interface for the SmallSelectedObject component
interface SmallSelectedObjectProps {
  id: string;
  index: number;
  type: number;
  cood: (w: number) => [number, number];
  handleMouseDown: () => void;
  handleReset: () => void;
}

// Define the SmallSelectedObject functional component
const SmallSelectedObject: React.FC<SmallSelectedObjectProps> = (props) => {
  // Define the size and style for the small cube
  const smallCubeSize = 7;
  const smallCubeStyle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "black",
    width: `${2 * smallCubeSize}px`,
    height: `${2 * smallCubeSize}px`,
  };

  // Define the size and style for the large cube
  // const largeCubeSize = 13;
  // const largeCubeStyle: React.CSSProperties = {
  //   position: "absolute",
  //   backgroundColor: "red",
  //   width: `${2 * largeCubeSize}px`,
  //   height: `${2 * largeCubeSize}px`,
  // };

  // Get the coordinates for the small and large cubes
  const [x, y] = props.cood(smallCubeSize);
  // const [xl, yl] = props.cood(largeCubeSize);

  return (
    // Render the large and small cubes
    // <React.Fragment key={`cubeFragment${props.index}00${props.id}`}>
      // <div
      //   key={`cubeLager${props.index}00${props.id}`}
      //   style={{
      //     left: xl,
      //     top: yl,
      //     ...largeCubeStyle,
      //   }}
      //   onMouseLeave={() => {
      //     props.handleReset();
      //   }}
      // ></div>

      <div
        key={`cubeSmall${props.index}00${props.id}`}
        style={{
          left: x,
          top: y,
          ...smallCubeStyle,
        }}
        onMouseDown={() => props.handleMouseDown()}
        onMouseUp={() => {
          props.handleReset();
        }}
      ></div>
    // </React.Fragment>
  );
};

export default SmallSelectedObject;
