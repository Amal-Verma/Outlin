import { textAttributes } from "./textAttributes";
import { colorAttributes } from "./colorAttributes";
import { layoutAttributes } from "./layoutAttributes";
import { borderAttributes } from "./borderAttributes";
import { animationAttributes } from "./animationAttributes";
import { positioningAttributes } from "./positioningAttributes";
import { customAttributes } from "./customAttributes";
import { essentialAttributes } from "./essentialAttributes";

type attributesRegistryType = {[key: string]: unknown};

const attributesRegistry: attributesRegistryType = {
  ...essentialAttributes,
  ...textAttributes,
  ...colorAttributes,
  ...layoutAttributes,
  ...borderAttributes,
  ...animationAttributes,
  ...positioningAttributes,
  ...customAttributes,
}

export { attributesRegistry };