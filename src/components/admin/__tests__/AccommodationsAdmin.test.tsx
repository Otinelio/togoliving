import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AccommodationsAdmin } from "../AccommodationsAdmin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Mock the hooks to avoid hitting Supabase directly and simplify component tests
vi.mock("@/hooks/useAccommodations", () => ({
  useAccommodations: vi.fn(() => ({
    items: [
      { id: "1", title: "Test Room 1", isPremium: true, description: "A great room" }
    ],
    isLoading: false,
    addItem: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn()
  }))
}));

vi.mock("@/hooks/useRooms", () => ({
  useRooms: vi.fn(() => ({
    rooms: [],
    addRoom: vi.fn(),
    updateRoom: vi.fn(),
    removeRoom: vi.fn()
  }))
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe("AccommodationsAdmin Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it("should render the title and list of accommodations", () => {
    render(<AccommodationsAdmin />, { wrapper });
    expect(screen.getByText("Hébergements (Site Client)")).toBeInTheDocument();
    expect(screen.getByText("Test Room 1")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("should open the modal when clicking 'Ajouter'", async () => {
    const user = userEvent.setup();
    render(<AccommodationsAdmin />, { wrapper });

    const addButton = screen.getByRole("button", { name: /ajouter/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Nouvel Hébergement")).toBeInTheDocument();
    });
  });
});
