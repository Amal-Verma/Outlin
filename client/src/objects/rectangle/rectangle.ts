import { attributes } from "@/types/object_types";
import { getAttributes } from "./getAttributes";

/**
 * Represents a rectangle object with attributes and essentials.
 */
export default class Rectangle {
  attributes: attributes;

  /**
   * Creates an instance of Rectangle.
   * @param x - The x-coordinate of the rectangle.
   * @param y - The y-coordinate of the rectangle.
   * @param width - The width of the rectangle.
   * @param height - The height of the rectangle.
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.attributes = {
      Essentials: {
        tag: "div",
        x: x,
        y: y,
        width: width,
        height: height,
        text: "",
      },

      Colors: {
        color: "#000000",
        "background-color": "#00ffff",
      },
      Fonts: {
        "font-size": "12",
        "font-family": "Arial",
      },
    };
  }

  /**
   * Adds an attribute to the rectangle.
   * @param name - The name of the attribute.
   * @param value - The value of the attribute.
   * @param groupName - The group name of the attribute (optional).
   */
  addAttribute(name: string, value: string, groupName?: string) {
    const defaultGroup = "Others";
    const targetGroup = groupName || defaultGroup;

    if (!this.attributes[targetGroup]) this.attributes[targetGroup] = {};

    this.attributes[targetGroup][name] = value;
  }

  /**
   * Checks if the rectangle contains another rectangle.
   * @param other - The other rectangle to check.
   * @returns True if the rectangle contains the other rectangle, otherwise false.
   */
  contains(other: Rectangle): boolean {
    return (
      this.attributes.Essentials.x <= other.attributes.Essentials.x &&
      this.attributes.Essentials.y <= other.attributes.Essentials.y &&
      this.attributes.Essentials.x + this.attributes.Essentials.width >=
        other.attributes.Essentials.x + other.attributes.Essentials.width &&
      this.attributes.Essentials.y + this.attributes.Essentials.height >=
        other.attributes.Essentials.y + other.attributes.Essentials.height
    );
  }

  /**
   * Normalizes the rectangle dimensions.
   */
  normalize(): void {
    console.log("normalize");
    if (this.attributes.Essentials.width < 0) {
      this.attributes.Essentials.x += this.attributes.Essentials.width;
      this.attributes.Essentials.width = -this.attributes.Essentials.width;
    }
    if (this.attributes.Essentials.height < 0) {
      this.attributes.Essentials.y += this.attributes.Essentials.height;
      this.attributes.Essentials.height = -this.attributes.Essentials.height;
    }
  }

  /**
   * Generates the style for the rectangle.
   * @param xref - The x-reference point.
   * @param yref - The y-reference point.
   * @param scale - The scale factor.
   * @returns The generated style as an object.
   */
  generateStyle(xref: number, yref: number, scale: number) {
    const x = (this.attributes.Essentials.x + xref) * scale;
    const y = (this.attributes.Essentials.y + yref) * scale;
    const width = this.attributes.Essentials.width * scale;
    const height = this.attributes.Essentials.height * scale;

    let style = `{
            "position":"absolute",
            "left":"${Math.min(x, x + width)}px",
            "top":"${Math.min(y, y + height)}px",
            "width":"${Math.abs(width)}px",
            "height":"${Math.abs(height)}px",`;

    for (const group in this.attributes) {
      if (group === "Essentials") continue;
      for (const attribute in this.attributes[group]) {
        style += getAttributes(attribute, this.attributes[group][attribute].toString());
      }
    }

    style = style.slice(0, -1);
    style += `}`;

    const out = JSON.parse(style);

    return out;
  }
}
