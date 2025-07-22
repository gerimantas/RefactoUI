import { render, screen, fireEvent } from "@testing-library/react";
import Toolbar from "../components/Toolbar";
import "@testing-library/jest-dom";

beforeAll(() => {
  window.alert = jest.fn();
});

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
    expect(window.alert).toHaveBeenCalledWith("Scan action");
    expect(scanButton).toBeEnabled();
  });
});
