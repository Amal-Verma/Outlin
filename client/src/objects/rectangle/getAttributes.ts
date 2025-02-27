import { getAttributeDetail } from "@/hooks/useAttribute";

/**
 * Retrieves the attribute details and generates the corresponding style string.
 * @param name - The name of the attribute.
 * @param value - The value of the attribute.
 * @returns The generated style string for the attribute.
 */
export const getAttributes = (name: string, value: string): string => {
  const attributeDetails = getAttributeDetail(name);

  if (!attributeDetails) {
    return "";
  }

  if (typeof attributeDetails.default === "number") {
    return (attributeDetails.react.code as (value: number) => string)(
      parseInt(value)
    );
  } else if (typeof attributeDetails.default === "string") {
    return (attributeDetails.react.code as (value: string) => string)(value);
  } else {
    return (attributeDetails.react.code as (value: string) => string)(value);
  }
};
