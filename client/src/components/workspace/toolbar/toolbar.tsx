"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setDrawType,
  setScale,
} from "@/lib/features/workspaceSlice/boardDetailsSlice";
import { setGeneratedCode } from "@/lib/features/workspaceSlice/generateCodeSlice";
import { DRAW } from "@/Enums/mouseEventsEnums";

import { useTree } from "@/hooks/useTree";
import { generateReactCode } from "@/objects/tree/generateCode/generateReactCode";
import { ImportTreeModal } from "./ImportTreeModal";
import { GroupModal } from "./GroupModal";

const ToolBar: React.FC = () => {
  // Initialize dispatch and router hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get the current scale from the Redux store
  const scale = useAppSelector((state) => state.boardDetails.scale);
  const Tree = useTree;

  // State for modal visibility and input values
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonString, setJsonString] = useState("");
  const [prefix, setPrefix] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  // Function to update the draw type in the Redux store
  const EditDrawType = (drawType: DRAW) => {
    dispatch(setDrawType(drawType));
  };

  // Function to update the scale in the Redux store
  const EditScale = (scale: number) => {
    dispatch(setScale(scale));
  };

  // Function to update the generated code in the Redux store
  const EditGeneratedCode = (code: string) => {
    dispatch(setGeneratedCode(code));
    // console.log(code);
  };

  // Function to handle import tree
  const handleImportTree = () => {
    Tree.importTree(jsonString, prefix, groupName);
    setIsModalOpen(false);
  };

  // Function to handle group selected objects
  const handleGroupSelected = () => {
    Tree.groupObjects(groupName);
    setIsGroupModalOpen(false);
  };

  // Get the generated code from the Redux store
  const generateCode = useAppSelector(
    (state) => state.generateCode.generatedCode
  );

  // Log the generated code whenever it changes
  useEffect(() => {
    console.log(generateCode);
  }, [generateCode]);

  return (
    <div className="flex justify-evenly items-center h-1/6 w-screen fixed top-0 bg-gray-200">
      {/* Button to set draw type to DRAW */}
      <button
        className="bg-red-500 p-2 rounded-md"
        onClick={() => {
          EditDrawType(DRAW.DRAW);
        }}
      >
        draw
      </button>
      {/* Button to set draw type to SELECT */}
      <button
        className="bg-green-500 p-2 rounded-md"
        onClick={() => {
          EditDrawType(DRAW.SELECT);
        }}
      >
        select
      </button>
      {/* Button to set draw type to SELECTRANGE */}
      <button
        className="bg-green-500 p-2 rounded-md"
        onClick={() => {
          EditDrawType(DRAW.SELECTRANGE);
        }}
      >
        select range
      </button>
      {/* Button to set draw type to PAN */}
      <button
        className="bg-blue-500 p-2 rounded-md"
        onClick={() => {
          EditDrawType(DRAW.PAN);
        }}
      >
        Pan
      </button>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Scale:</span>
        {/* Input range to adjust the scale */}
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={scale}
          onChange={(e) => {
            EditScale(parseFloat(e.target.value));
          }}
          className="w-32 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <span className="min-w-[2.5rem] text-sm font-medium">
          {scale.toFixed(1)}x
        </span>
      </div>
      {/* Button to generate React code and navigate to /test */}
      <button
        className="bg-green-500 p-2 rounded-md"
        onClick={() => {
          EditGeneratedCode(generateReactCode(Tree));
          router.push("/test");
        }}
      >
        Generate React Code
      </button>
      {/* Button to export tree */}
      <button
        className="bg-yellow-500 p-2 rounded-md"
        onClick={() => {
          const exportedTree = Tree.exportTree();
          console.log(exportedTree);
        }}
      >
        Export Tree
      </button>
      {/* Button to open import modal */}
      <button
        className="bg-purple-500 p-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Import Tree
      </button>
      {/* Button to open group modal */}
      <button
        className="bg-blue-500 p-2 rounded-md"
        onClick={() => setIsGroupModalOpen(true)}
      >
        Group Selected
      </button>
      <ImportTreeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImport={handleImportTree}
        jsonString={jsonString}
        setJsonString={setJsonString}
        prefix={prefix}
        setPrefix={setPrefix}
        groupName={groupName}
        setGroupName={setGroupName}
      />
      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onGroup={handleGroupSelected}
        groupName={groupName}
        setGroupName={setGroupName}
      />
    </div>
  );
};

export default ToolBar;
