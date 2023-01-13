// e2e tests for the country page

import test from "./next-fixture";
import { expect } from "@playwright/test";

test("country page - home to country page and back", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/`);

  const navigationPromise1 = page.waitForNavigation();

  await page.locator("figure", { hasText: "Algeria" }).click();

  await navigationPromise1;

  const countryname = await page.locator("h2");

  await expect(countryname).toContainText("Algeria");

  const navigationPromise2 = page.waitForNavigation();

  await page.locator("button", { hasText: "Back" }).click();

  await navigationPromise2;

  const textinput = await page.getByTitle("Search for a country");

  await expect(textinput).toHaveAttribute("value", "");
});

test("country page - toggle button", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/countries/Afghanistan`);

  const togglebutton = await page.getByTitle("Change to dark mode");

  await togglebutton.click();

  const newtoggle = await page.getByTitle("Change to light mode");

  await expect(newtoggle).toContainText("Dark Mode");
});

test("country page - border country buttons click through to page", async ({
  page,
  port,
}) => {
  await page.goto(`http://localhost:${port}/countries/Afghanistan`);

  const navigationPromise = page.waitForNavigation();

  await page.getByText("Iran").click();

  await navigationPromise;

  const countryname = await page.locator("h2");

  await expect(countryname).toContainText("Iran");
});

test("country page - border country buttons click through to page and back", async ({
  page,
  port,
}) => {
  await page.goto(`http://localhost:${port}/countries/Afghanistan`);

  const navigationPromise1 = page.waitForNavigation();

  await page.getByText("Iran").click();

  const countryname1 = await page.locator("h2");

  await expect(countryname1).toContainText("Iran");

  await navigationPromise1;

  const navigationPromise2 = page.waitForNavigation();

  await page.locator("button", { hasText: "Back" }).click();

  await navigationPromise2;

  const countryname2 = await page.locator("h2");

  await expect(countryname2).toContainText("Afghanistan");
});
