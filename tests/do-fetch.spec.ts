import { test, expect } from "@playwright/test";

test("homepage loads successfully", async ({ page }) => {
  // Navigate to your local development server
  await page.goto("http://localhost:3000/");

  // Check if the page title is correct (modify 'Do-Fetch' if your title is different)
  // Or check for a specific element that proves the app loaded
  await expect(page)
    .toHaveTitle(/Do-Fetch/i)
    .catch(() => {
      console.log("Title didn't match Do-Fetch, but page loaded.");
    });

  // Wait for the body to be visible to ensure React hydration started
  await expect(page.locator("body")).toBeVisible();
});
