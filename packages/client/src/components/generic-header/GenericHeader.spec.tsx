import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GenericHeader from "./GenericHeader";

describe("GenericHeader Component", () => {
  it("renders with correct headerTitle and id from useParams", () => {
    const mockHeaderTitle = "Test Header";
    const mockId = "123";

    // Render the component with a mocked router context
    render(
      <MemoryRouter initialEntries={[`/${mockHeaderTitle}/${mockId}`]}>
        <Routes>
          <Route path="/:headerTitle/:id" element={<GenericHeader />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert the rendered content
    const headerElement = screen.getByText(`${mockHeaderTitle}: ${mockId}`);
    expect(headerElement).toBeInTheDocument();
  });
});
