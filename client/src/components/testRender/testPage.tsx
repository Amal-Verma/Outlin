"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import DynamicRenderer from "./dynamicRender";

const TestPage = () => {
  // State to hold the processed code string
  const [string, setString] = useState("");
  // Selector to get the generated code from the Redux store
  const generateCode = useAppSelector(
    (state) => state.generateCode.generatedCode
  );

  useEffect(() => {
    // Extract the generated code from the Redux store
    const newString = generateCode;
    // Extract the return statement from the generated code
    const start = newString.indexOf("return (");
    const end = newString.lastIndexOf(")");
    const extracted = newString.slice(start, end + 1);

    console.log(extracted);

    // Process the extracted code to create a new component function
    const processed =
      "(window as any).GeneratedComponent = function GeneratedComponent() {\n" +
      extracted +
      "\n}";
    console.log(processed);

    // Update the state with the processed code
    setString(processed);
  }, [generateCode]);

  // Render the DynamicRenderer component with the processed code
  return <DynamicRenderer code={string} />;
};

export default TestPage;
