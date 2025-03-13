"use client";

import React, { useEffect, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setRefPoint,
  setMouseType,
  setMousePoint,
  setMouseDown,
  setKeyboardEvent,
  setDrawType,
} from "@/lib/features/workspaceSlice/boardDetailsSlice";

import { useTree } from "@/hooks/useTree";
import { MOUSE } from "@/Enums/mouseEventsEnums";
import { tree, node } from "@/types";

import SelectedObj from "@/components/workspace/board/selectedObj/selectedObj";

import { handleMouseDown } from "@/components/workspace/board/mouseEvents/handleMouseDown/handleMouseDown";
import { handleMouseDownObject } from "@/components/workspace/board/mouseEvents/handleMouseDown/handleMouseDownObject";
import { handleMouseMove } from "@/components/workspace/board/mouseEvents/handleMouseMove/handleMouseMove";
import { handleMouseUp } from "@/components/workspace/board/mouseEvents/handleMouseUp/handleMouseUp";
import { handleKeyDownEvents } from "@/components/workspace/board/keyEvents/keyDownEvents";

interface boardProps {
  renderWorkspace: boolean;
  forceRenderWorkspace: () => void;
}

const Board: React.FC<boardProps> = (props) => {
  // Redux dispatch function
  const dispatch = useAppDispatch();

  // Selectors to get state from the Redux store
  const scale = useAppSelector((state) => state.boardDetails.scale);
  const xref = useAppSelector((state) => state.boardDetails.xref);
  const yref = useAppSelector((state) => state.boardDetails.yref);
  const mouseType = useAppSelector((state) => state.boardDetails.mouseType);
  const mouseX = useAppSelector((state) => state.boardDetails.mouseX);
  const mouseY = useAppSelector((state) => state.boardDetails.mouseY);
  const mouseDown = useAppSelector((state) => state.boardDetails.mouseDown);
  const drawType = useAppSelector((state) => state.boardDetails.drawType);
  const KeyboardEvent = useAppSelector(
    (state) => state.boardDetails.KeyboardEvent
  );

  // Functions to dispatch actions to update the Redux store
  const EditRefPoint = (dx: number, dy: number) => {
    dispatch(setRefPoint({ xref: xref + dx, yref: yref + dy }));
  };
  const EditMouseType = (mouseType: MOUSE) => {
    dispatch(setMouseType(mouseType));
  };
  const EditMousePoint = (mouseX: number, mouseY: number) => {
    dispatch(setMousePoint({ mouseX: mouseX, mouseY: mouseY }));
  };
  const EditMouseDown = (mouseDown: boolean) => {
    dispatch(setMouseDown(mouseDown));
  };
  const EditKeyboardEvent = useCallback(
    (KeyboardEvent: boolean) => {
      dispatch(setKeyboardEvent(KeyboardEvent));
    },
    [dispatch]
  );
  const EditDrawType = (drawType: number) => {
    dispatch(setDrawType(drawType));
  };

  // Hook to manage the tree structure
  const Tree: tree = useTree;

  // State to manage temporary objects and rendering
  const [tempObjects, setTempObjects] = React.useState<Array<node>>([]);
  const [object, setObject] = React.useState<node | null>(null);
  const [render, setRender] = React.useState(false);
  const boardRef = React.useRef<HTMLDivElement>(null);

  // Function to force re-render temporary selected objects
  const forceRenderTempSelected = useCallback(() => {
    console.log("forceRenderTempSelected");
    setRender((prev) => !prev);
  }, []); // Memoize the callback

  // Log xref changes
  useEffect(() => {
    console.log("xref", xref);
  }, [xref]);

  // Log yref changes
  useEffect(() => {
    console.log("yref", yref);
  }, [yref]);

  // Log scale changes
  useEffect(() => {
    console.log("scale", scale);
  }, [scale]);

  // Focus on the board and enable keyboard events
  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.focus();
    }
    EditKeyboardEvent(true);
  }, [EditKeyboardEvent]);

  // Handle key down events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!KeyboardEvent) return;
      handleKeyDownEvents(e, Tree, scale, props.forceRenderWorkspace);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [KeyboardEvent, Tree, props.forceRenderWorkspace, scale]);

  // Render the board and handle mouse events
  return (
    <div
      key={`board${props.renderWorkspace}`}
      className="h-screen w-screen bg-gray-200 overflow-hidden relative"
      ref={boardRef}
      tabIndex={0}
      onMouseDown={(e) =>
        handleMouseDown(
          e,
          EditMousePoint,
          EditMouseDown,
          setTempObjects,
          xref,
          yref,
          scale,
          drawType,
          forceRenderTempSelected
        )
      }
      onMouseMove={(e) =>
        handleMouseMove(
          e,
          EditMousePoint,
          EditRefPoint,
          mouseDown,
          mouseType,
          drawType,
          tempObjects,
          mouseX,
          mouseY,
          scale,
          Tree,
          object,
          forceRenderTempSelected
        )
      }
      onMouseUp={(e) =>
        handleMouseUp(
          e,
          EditMousePoint,
          EditMouseDown,
          setTempObjects,
          setObject,
          tempObjects,
          mouseType,
          drawType,
          EditMouseType,
          EditDrawType,
          Tree,
          props.forceRenderWorkspace
        )
      }
      onMouseEnter={() => EditKeyboardEvent(true)}
      onMouseLeave={() => EditKeyboardEvent(false)}
    >
      {Tree.objects.map((element) => {
        const { node, id } = element;
        return (
          <div
            key={`object${id}`}
            className="bg-blue-600"
            style={node.body.generateStyle(xref, yref, scale)}
            onMouseDown={(e) =>
              handleMouseDownObject(
                e,
                node,
                EditMouseType,
                Tree,
                drawType,
                props.forceRenderWorkspace
              )
            }
          >
            {node.body.Essentials.text}
          </div>
        );
      })}

      {Tree.selectedObject.map((node) => {
        return (
          <SelectedObj
            key={`selectedObject${node.id}${render}`}
            selectedObj={node}
            id={node.id}
            setObj={setObject}
            setTempObject={setTempObjects}
            xref={xref}
            yref={yref}
            scale={scale}
          />
        );
      })}

      {tempObjects.length && (
        <>
          {tempObjects.map((tempObject) => {
            return (
              <div
                key={`tempObject${render}`}
                className="bg-red-600"
                style={tempObject.body.generateStyle(xref, yref, scale)}
              ></div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Board;
