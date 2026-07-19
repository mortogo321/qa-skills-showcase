import { test, expect } from '../../src/fixtures/pom.fixture';
import { users } from '../../src/data/users';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('product list shows six items @smoke', async ({ inventoryPage }) => {
    expect(await inventoryPage.itemCount()).toBe(6);
  });

  test('sort by price low to high orders prices ascending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.itemPrices();
    const ascending = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(ascending);
  });

  test('sort Z to A orders names descending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.itemNamesText();
    const descending = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(descending);
  });
});
