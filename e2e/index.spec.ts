import test from "./next-fixture";
import { expect } from "@playwright/test";

test("basic test", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/`);
  const heading = await page.innerText("h1");
  await expect(heading).toBe("Where in the World?");
});
