// e2e tests for the home page

import test from "./next-fixture";
import { expect } from "@playwright/test";

test("homepage - h1 text", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/`);

  const heading = await page.getByText("Where in the World?");

  await heading.click();

  const newheading = await page.innerText("h1");

  await expect(newheading).toBe("Where in the World?");
});

test("homepage - toggle dark mode", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/`);

  const togglebutton = await page.getByTitle("Change to dark mode");

  await togglebutton.click();

  const newtoggle = await page.getByTitle("Change to light mode");

  await expect(newtoggle).toContainText("Dark Mode");
});

test("homepage - filter countries", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/`);

  const filterselect = await page.getByTitle(
    "Filter countries by geographic region"
  );

  await filterselect.selectOption("Americas");

  const countrycard = await page.getByTitle("Go to the Aruba page");

  await expect(countrycard).toContainText("Aruba");
});

test("homepage - search country", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/`);

  const textinput = await page.getByTitle("Search for a country");

  await textinput.fill("peru");

  await page.keyboard.press("Enter");

  const countrycard = await page.getByTitle("Go to the Peru page");

  await expect(countrycard).toContainText("Peru");
});

//test("homepage - click through to country page", async ({ page, port }) => {
//  const navigationPromise = page.waitForNavigation();
//
//  await page.locator("figure", { hasText: "Algeria" }).click();
//
//  await navigationPromise;
//
//  const countryname = await page.locator("h2");
//
//  await expect(countryname).toContainText("Algeria");
//});
