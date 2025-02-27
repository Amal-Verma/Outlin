import { attributesRegistry } from "@/attributes/attributesRegistry";
import { getAttributeDetailType } from "@/types";

export const getAttributeDetail: (name: string) => getAttributeDetailType = (
  name: string
) => {
  return attributesRegistry[name] as getAttributeDetailType;
};
