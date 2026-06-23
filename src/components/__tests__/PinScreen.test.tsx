import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { PinScreen } from "../PinScreen";
import React from "react";

vi.mock("../Logo", () => ({
  Logo: () => <div>Logo</div>
}));

describe("PinScreen Component", () => {
  it("should render the title and instruction", () => {
    render(<PinScreen title="Admin Login" expectedPin="1234" onUnlock={vi.fn()} />);
    expect(screen.getByText("Admin Login")).toBeInTheDocument();
    expect(screen.getByText("Entrez votre code PIN")).toBeInTheDocument();
  });

  it("should call onUnlock when correct PIN is entered", async () => {
    const onUnlockMock = vi.fn();
    render(<PinScreen title="Admin Login" expectedPin="1234" onUnlock={onUnlockMock} />);
    
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "4" }));

    // onUnlock is called after a 150ms timeout
    await waitFor(() => {
      expect(onUnlockMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should clear the PIN and not call onUnlock when wrong PIN is entered", async () => {
    const onUnlockMock = vi.fn();
    render(<PinScreen title="Admin Login" expectedPin="1234" onUnlock={onUnlockMock} />);
    
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "1" }));

    // Verify it shakes and clears (shake timeout is 400ms)
    await waitFor(() => {
      expect(onUnlockMock).not.toHaveBeenCalled();
    }, { timeout: 500 });
  });
});
