import Rectangle from "../objects/rectangle/rectangle";

describe("Rectangle", () => {
  test("should initialize correctly", () => {
    const rect = new Rectangle(10, 20, 30, 40);
    expect(rect.Essentials.x).toBe(10);
    expect(rect.Essentials.y).toBe(20);
    expect(rect.Essentials.width).toBe(30);
    expect(rect.Essentials.height).toBe(40);
  });

  test("should add attributes correctly", () => {
    const rect = new Rectangle(10, 20, 30, 40);
    rect.addAttribute("border", "1px solid black", "Borders");
    expect(rect.attributes.Borders.border).toBe("1px solid black");
  });

  test("should contain another rectangle correctly", () => {
    const rect1 = new Rectangle(10, 20, 30, 40);
    const rect2 = new Rectangle(15, 25, 10, 10);
    expect(rect1.contains(rect2)).toBe(true);
  });

  test("should normalize dimensions correctly", () => {
    const rect = new Rectangle(10, 20, -30, -40);
    rect.normalize();
    expect(rect.Essentials.x).toBe(-20);
    expect(rect.Essentials.y).toBe(-20);
    expect(rect.Essentials.width).toBe(30);
    expect(rect.Essentials.height).toBe(40);
  });

  test("should generate style correctly", () => {
    const rect = new Rectangle(10, 20, 30, 40);
    const style = rect.generateStyle(0, 0, 1);
    expect(style.position).toBe("absolute");
    expect(style.left).toBe("10px");
    expect(style.top).toBe("20px");
    expect(style.width).toBe("30px");
    expect(style.height).toBe("40px");
  });
});
