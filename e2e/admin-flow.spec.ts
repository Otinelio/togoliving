import { test, expect } from '@playwright/test';

test.describe('Admin General Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Basic Supabase mocks to prevent failing requests
    await page.route('**/rest/v1/*', async route => {
      const method = route.request().method();
      if (method === 'GET') {
        await route.fulfill({ status: 200, body: '[]' });
      } else {
        await route.fulfill({ status: 200, body: '[{}]' });
      }
    });
  });

  test('Should navigate through different admin sections', async ({ page }) => {
    await page.goto('/admin');

    // Enter PIN "9999" (assuming it falls back to 1234 or we mocked it)
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("9")');

    await expect(page.locator('text=Vue Générale')).toBeVisible({ timeout: 5000 });

    // Test navigation
    await page.click('button:has-text("Menu")');
    await expect(page.locator('h1:has-text("Gestion Menu")')).toBeVisible();

    await page.click('button:has-text("État Chambres")');
    await expect(page.locator('h1:has-text("Disponibilité")')).toBeVisible();

    await page.click('button:has-text("Événements")');
    await expect(page.locator('h2:has-text("Gestion des Événements")')).toBeVisible();

    await page.click('button:has-text("Emplois")');
    await expect(page.locator('h2:has-text("Gestion des Emplois")')).toBeVisible();
  });
});
