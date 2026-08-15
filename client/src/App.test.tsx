import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import MusicPlayer from "./components/MusicPlayer";

describe("anniversary experience", () => {
  it("lets visitors jump from the hero to the story", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /begin our story/i }),
    ).toHaveAttribute("href", "#story");
    expect(
      screen.getByRole("region", { name: /our story/i }),
    ).toHaveAttribute("id", "story");
  });

  it("announces the selected song after using the next-song control", async () => {
    const user = userEvent.setup();
    render(<MusicPlayer />);

    await user.click(screen.getByRole("button", { name: /next song/i }));

    expect(
      screen.getByRole("heading", { name: "Balisong Transformed 2016" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Balisong Transformed 2016",
    );
  });
});
