import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRooms } from "../useRooms";
import { supabase } from "@/lib/supabase";
import { DEFAULT_ROOMS } from "@/data/defaultRooms";
import React from "react";

// The supabase mock is already setup in tests/setup.ts, 
// but we can customize its returned value per test if needed.

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

describe("useRooms hook", () => {
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

  it("should return default rooms when supabase query fails or is empty", async () => {
    // Mock Supabase to return empty data
    // @ts-ignore
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null })
    });

    const { result } = renderHook(() => useRooms(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.rooms).toEqual(DEFAULT_ROOMS);
  });

  it("should merge fetched rooms with default rich content", async () => {
    const fakeRoomFromDb = { id: "4", type: "Studios", status: "Occupe" };
    
    // @ts-ignore
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [fakeRoomFromDb], error: null })
    });

    const { result } = renderHook(() => useRooms(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // It should have all DEFAULT_ROOMS, and 4 should be updated to Occupe
    const room4 = result.current.rooms.find(r => r.id === "4");
    expect(room4?.status).toBe("Occupe");
    expect(room4?.title).toBeDefined(); // Rich content from DEFAULT_ROOMS merged
  });
});
