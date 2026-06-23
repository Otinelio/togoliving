import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAccommodations } from "../useAccommodations";
import { supabase } from "@/lib/supabase";
import React from "react";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("useAccommodations hook", () => {
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

  it("should fetch accommodations and fix '1 Chambre Salon' title", async () => {
    const fakeAccommodations = [
      { id: "1", title: "Studios" },
      { id: "2", title: "1 Chambre Salon" }
    ];

    // @ts-ignore
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: fakeAccommodations, error: null })
    });

    const { result } = renderHook(() => useAccommodations(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0].title).toBe("Studios");
    expect(result.current.items[1].title).toBe("Chambre Salon"); // Title should be fixed
  });

  it("should handle add item mutation", async () => {
    const fakeItem = { title: "Test Accommodation" };
    const returnedItem = { id: "10", ...fakeItem };

    // @ts-ignore
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: returnedItem, error: null })
    });

    const { result } = renderHook(() => useAccommodations(), { wrapper });

    result.current.addItem(fakeItem);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("accommodations");
    });
  });
});
