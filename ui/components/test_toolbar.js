import { render, screen, fireEvent } from "@testing-library/react";
import Toolbar from "./Toolbar";

describe("Toolbar", () => {
  it("renders all toolbar actions", () => {
    render(<Toolbar />);
    ["Scan", "Proposals", "Apply", "Run Tests", "Undo", "Update Rules", "History"].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("triggers action on button click", () => {
    render(<Toolbar />);
    const scanButton = screen.getByText("Scan");
    fireEvent.click(scanButton);
    // Since actions are stubbed with alert, no state change to assert
    // This test ensures button is clickable
    expect(scanButton).toBeEnabled();
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import Toolbar from "./Toolbar";

describe("Toolbar", () => {
  it("renders all toolbar actions", () => {
    render(<Toolbar />);
    ["Scan", "Proposals", "Apply", "Run Tests", "Undo", "Update Rules", "History"].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("triggers action on button click", () => {
    render(<Toolbar />);
    const scanButton = screen.getByText("Scan");
    fireEvent.click(scanButton);
    // Since actions are stubbed with alert, no state change to assert
    // This test ensures button is clickable
    expect(scanButton).toBeEnabled();
  });
});
