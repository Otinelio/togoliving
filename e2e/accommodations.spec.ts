import { test, expect } from '@playwright/test';

// The user requested that we don't modify real data.
// We can use Playwright's route mocking to intercept Supabase API calls.

test.describe('Hébergements Public & Admin Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Mock Supabase API calls to return fake data and prevent writing to DB
    await page.route('**/rest/v1/accommodations*', async route => {
      const method = route.request().method();
      
      if (method === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: "test-acc-1",
              title: "Suite Royale E2E",
              isPremium: true,
              description: "Une suite fantastique pour les tests E2E.",
              imageUrl: "https://via.placeholder.com/800x600?text=Suite+Royale"
            }
          ])
        });
      } else if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
        // Mock successful creation/update/deletion without touching DB
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: "test-acc-new", title: "New Room" }])
        });
      } else {
        await route.continue();
      }
    });
  });

  test('Public site should display accommodations', async ({ page }) => {
    // Go to public accommodations page
    await page.goto('/hebergements');

    // It should display the mocked accommodation
    await expect(page.locator('text=Suite Royale E2E')).toBeVisible();
    await expect(page.locator('text=Une suite fantastique pour les tests E2E.')).toBeVisible();
    await expect(page.locator('text=Premium')).toBeVisible();
  });

  test('Admin can view and open new accommodation modal', async ({ page }) => {
    // Mock local storage to bypass PIN screen for testing if needed
    // However, let's just test the PIN screen flow first.
    
    // We can't easily mock the admin auth state if it relies on localStorage 'togoliving_settings'.
    // Let's just go to admin and enter the default PIN if we haven't mocked the hook.
    // The default PIN is usually 1234 or configured in settings.
    // To make this stable, we mock the settings API as well.
    await page.route('**/rest/v1/settings*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ key: 'pinAdmin', value: '1234' }])
      });
    });

    await page.goto('/admin');

    // Enter PIN "1234"
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("4")');

    // Wait for unlock
    await expect(page.locator('text=Vue Générale')).toBeVisible({ timeout: 5000 });

    // Click on Hébergements tab
    // We have to find the button. It might be hidden on mobile, but playwright runs desktop by default.
    await page.click('button:has-text("Hébergements")');

    // Wait for the accommodations admin view
    await expect(page.locator('h1:has-text("Hébergements (Site Client)")')).toBeVisible();

    // Verify mocked data is visible
    await expect(page.locator('text=Suite Royale E2E').first()).toBeVisible();

    // Click Ajouter
    await page.click('button:has-text("Ajouter")');

    // Modal should appear
    await expect(page.locator('h2:has-text("Nouvel Hébergement")')).toBeVisible();

    // Fill the title
    await page.fill('input[placeholder="Ex: Studios"]', 'Chambre Test Playwright');

    // Save
    await page.click('button:has-text("Enregistrer")');

    // Since we mocked POST, it should just close the modal and succeed
    await expect(page.locator('h2:has-text("Nouvel Hébergement")')).toBeHidden();
  });
});
