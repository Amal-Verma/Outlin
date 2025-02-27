"use client";

import React from "react";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Board, ToolBar, and PropertyWindow components
const Board = dynamic(() => import("@/components/workspace/board/board"));
const ToolBar = dynamic(() => import("@/components/workspace/toolbar/toolbar"));
const PropertyWindow = dynamic(
  () => import("@/components/workspace/propertyWindow/propertyWindow")
);

const Page = () => {
  // State to trigger re-rendering of the entire workspace
  const [render, setRender] = useState(false);

  // Callback to force re-rendering of the entire workspace
  const forceRenderWorkspace = useCallback(() => {
    console.log("Forcing workspace render");
    setRender((prev) => !prev);
  }, []);

  return (
    <div key={`workspace`}>
      {/* Render the Board component with renderWorkspace and forceRenderWorkspace props */}
      <Board
        renderWorkspace={render}
        forceRenderWorkspace={forceRenderWorkspace}
      />
      {/* Render the ToolBar component */}
      <ToolBar />
      {/* Render the PropertyWindow component with renderWorkspace and forceRenderWorkspace props */}
      <PropertyWindow
        renderWorkspace={render}
        forceRenderWorkspace={forceRenderWorkspace}
      />
    </div>
  );
};

// Export the Page component with dynamic import and disable server-side rendering
export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
