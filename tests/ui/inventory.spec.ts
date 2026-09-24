import { users } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/pom.fixture';

test.describe('Inventory', () => {
	test.beforeEach(async ({ page, loginPage }) => {
		await loginPage.goto();
		await loginPage.login(users.standard.username, users.standard.password);
		await expect(page).toHaveURL(/inventory\.html/);
	});

	test('product list shows six items @smoke', async ({
		page,
		inventoryPage,
	}) => {
		await expect
			.poll(async () => inventoryPage.itemCount(), { timeout: 10_000 })
			.toBe(6);
		await expect(page).toHaveURL(/inventory\.html/);
	});

	test('sort by price low to high orders prices ascending', async ({
		inventoryPage,
	}) => {
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
