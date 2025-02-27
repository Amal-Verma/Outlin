import React, { useState, useEffect } from "react";

// Define the props for the DynamicRenderer component
interface DynamicRendererProps {
  code: string;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ code }) => {
  // State to hold the dynamically generated component
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  // Function to load Babel if it's not already loaded
  const loadBabel = (): Promise<void> => {
    if ((window as unknown as { Babel: unknown }).Babel)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@babel/standalone/babel.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Babel"));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        // Load Babel
        await loadBabel();
        console.log("Babel loaded successfully");

        // Make React available globally before transforming
        (window as unknown as { React: typeof React }).React = React;

        console.log("Original code:", code);
        // Transform the code using Babel
        const transformedCode = (
          window as unknown as {
            Babel: {
              transform: (code: string, options: object) => { code: string };
            };
          }
        ).Babel.transform(code, {
          filename: "file.tsx",
          presets: ["typescript", "react", ["env", { modules: false }]],
        }).code;
        console.log("Transformed code:", transformedCode);

        // Evaluate the transformed code to generate the component
        eval(transformedCode);
        console.log(
          "Code evaluated, window.GeneratedComponent:",
          (window as unknown as { GeneratedComponent: React.ComponentType })
            .GeneratedComponent
        );

        // Retrieve the generated component from the global window object
        const GeneratedComponent = (
          window as unknown as { GeneratedComponent: React.ComponentType }
        ).GeneratedComponent;
        GeneratedComponent.displayName = "GeneratedComponent";
        setComponent(() => GeneratedComponent);
      } catch (error) {
        console.error("Error transforming/evaluating code:", error);
        // Set an error component if there is an issue with transforming/evaluating the code
        setComponent(() => {
          const ErrorComponent: React.FC = () => (
            <div>Error rendering dynamic component</div>
          );
          ErrorComponent.displayName = "ErrorComponent";
          return ErrorComponent;
        });
      }
    })();
  }, [code]);

  // Render a loading message if the component is not yet available
  if (!Component) {
    return <div>Loading dynamic component...</div>;
  }

  // Render the dynamically generated component
  return <Component />;
};

export default DynamicRenderer;
