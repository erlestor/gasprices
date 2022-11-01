import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideBar from "../Components/sidebar/Sidebar";

describe("Sidebar", () => {
  it("should check of a radio button", () => {
    render(<SideBar collapsed={false} />);

    // check that the radio button is not checked
    // select an option in the radio group
    // select oslo
    userEvent.click(screen.getByTestId("Oslo"));
    // check that the radio button is checked
    expect(screen.getByRole("radio", { name: "Oslo" })).toBeChecked();
    // press the clear button
    userEvent.click(screen.getByTestId("clear"));
    expect(screen.getByRole("radio", { name: "Oslo" })).not.toBeChecked();
  });
});
