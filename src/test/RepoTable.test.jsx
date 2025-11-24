import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RepoTable from "../components/RepoTable";
import { ThemeContext } from "../context/ThemeContext";

// Mock useFetch hook
vi.mock("../hooks/useFetch", () => ({
  useFetch: () => ({
    data: [
      { id: 1, name: "Zoo" },
      { id: 2, name: "Apple" },
      { id: 3, name: "Mango" },
    ],
    loading: false,
    error: "",
  }),
}));

function renderWithTheme(ui, theme = "light") {
  return render(
    <ThemeContext.Provider value={{ theme, toggleTheme: () => {} }}>
      {ui}
    </ThemeContext.Provider>,
  );
}

describe("RepoTable Component", () => {
  it("renders repo list", () => {
    renderWithTheme(<RepoTable />);

    expect(screen.getByText("Zoo")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Mango")).toBeInTheDocument();
  });

  it("filters results by search", () => {
    renderWithTheme(<RepoTable />);

    const input = screen.getByPlaceholderText("Search repositories...");

    fireEvent.change(input, { target: { value: "zo" } });

    expect(screen.getByText("Zoo")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Mango")).not.toBeInTheDocument();
  });

  it("sorts Z → A", () => {
    renderWithTheme(<RepoTable />);

    const select = screen.getByDisplayValue("A → Z");

    fireEvent.change(select, { target: { value: "desc" } });

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Zoo");
  });

  it("applies dark mode class", () => {
    const { container } = renderWithTheme(<RepoTable />, "dark");

    expect(container.firstChild.className).toMatch(/containerDark/);
  });
});
