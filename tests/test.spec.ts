import { test, expect, type Page } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/login'); // Change port if needed
  });

  test('should allow user to log in with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('winnguyen2004@gmail.com');
    await page.getByLabel('Password').fill('windoimkroi01');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Expect to be redirected to dashboard or see a dashboard element
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@callcenter.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Expect an error toast or message
    await expect(page.getByText(/invalid|error|failed/i)).toBeVisible();
  });

  test('should allow switching to sign up and back', async ({ page }) => {
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();

    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should require email and password', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });
});

// You can add more tests for navigation and other pages after login, similar to the todo app example.
