
/**
 * Converts an object to a string representation.
 * @param o - The object to convert.
 * @returns The string representation of the object.
 */
export function objectToString(o: unknown): string {
  if (typeof o === "object" && o !== null) {
    if (Array.isArray(o)) {
      return `[${o.map(objectToString).join(", ")}]`;
    } else {
      const entries = Object.entries(o)
        .map(([key, value]) => `${key}: ${objectToString(value)}`)
        .join(", ");
      return `{ ${entries} }`;
    }
  } else if (typeof o === "string") {
    return `"${o}"`;
  } else {
    return String(o);
  }
}
