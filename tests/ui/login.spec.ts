import { test, expect } from '../../src/fixtures/pom.fixture';
import { users, errors } from '../../src/data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid login lands on the inventory page @smoke', async ({ page, loginPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, 'wrong-password');
    await loginPage.expectError(errors.badCredentials);
  });

  test('locked_out_user shows the locked-out error @smoke', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError(errors.lockedOut);
  });

  test('empty username shows a required-field error', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await loginPage.expectError(errors.usernameRequired);
  });
});
