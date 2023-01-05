import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LinkButton from "../components/LinkButton/LinkButton.component";

describe("LinkButton", () => {
  it("renders without crashing", () => {
    expect(() =>
      render(
        <LinkButton
          buttonprops={{
            title: "text",
          }}
        />
      )
    ).not.toThrow();
  });
});
