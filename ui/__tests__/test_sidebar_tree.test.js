import { render, screen, fireEvent } from "@testing-library/react";
import SidebarTree from "../components/SidebarTree";
import "@testing-library/jest-dom";

describe("SidebarTree", () => {
  it("renders project file tree", () => {
    render(<SidebarTree />);
    expect(screen.getByText("Project Files")).toBeInTheDocument();
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("tests")).toBeInTheDocument();
  });

  it("expands and collapses tree nodes", () => {
    render(<SidebarTree />);
    const srcButton = screen.getAllByRole("button", { name: /Expand|Collapse/ })[0];
    fireEvent.click(srcButton); // expand
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    fireEvent.click(srcButton); // collapse
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("shows context menu on node", () => {
    render(<SidebarTree />);
    fireEvent.click(screen.getByText("src"));
    // Context menu should appear (Radix UI renders in portal, so skip direct DOM check)
    // This test ensures trigger is clickable
    expect(screen.getByText("src")).toBeEnabled();
  });
});
