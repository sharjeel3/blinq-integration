import Text from "./index";
import { render } from "@testing-library/react";

describe("Text", () => {
  it("should render content", () => {
    const screen = render(<Text>Test</Text>);
    expect(screen.getByText("Test")).toBeVisible();
  });
});
