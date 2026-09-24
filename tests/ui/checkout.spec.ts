import { checkoutInfo, errors, users } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/pom.fixture';

const BACKPACK = 'sauce-labs-backpack';
const BIKE_LIGHT = 'sauce-labs-bike-light';

test.describe('Checkout', () => {
	test.beforeEach(async ({ page, loginPage }) => {
		await loginPage.goto();
		await loginPage.login(users.standard.username, users.standard.password);
		await expect(page).toHaveURL(/inventory\.html/);
	});

	test('adding two items shows a badge of 2, removing one drops it to 1', async ({
		inventoryPage,
	}) => {
		await inventoryPage.addToCart(BACKPACK);
		await inventoryPage.addToCart(BIKE_LIGHT);
		expect(await inventoryPage.cartBadgeCount()).toBe(2);

		await inventoryPage.removeFromCart(BIKE_LIGHT);
		expect(await inventoryPage.cartBadgeCount()).toBe(1);
	});

	test('full checkout happy path completes the order @smoke', async ({
		inventoryPage,
		checkoutPage,
	}) => {
		await inventoryPage.addToCart(BACKPACK);
		await inventoryPage.openCart();
		await checkoutPage.goToCheckout();
		await checkoutPage.fillInfo(
			checkoutInfo.firstName,
			checkoutInfo.lastName,
			checkoutInfo.postalCode,
		);
		await checkoutPage.continueToOverview();
		await checkoutPage.finish();

		expect(await checkoutPage.completeHeaderText()).toBe(
			'Thank you for your order!',
		);
	});

	test('missing first name shows a validation error', async ({
		inventoryPage,
		checkoutPage,
	}) => {
		await inventoryPage.addToCart(BACKPACK);
		await inventoryPage.openCart();
		await checkoutPage.goToCheckout();
		await checkoutPage.fillInfo(
			'',
			checkoutInfo.lastName,
			checkoutInfo.postalCode,
		);
		await checkoutPage.continueToOverview();

		expect(await checkoutPage.errorText()).toBe(errors.firstNameRequired);
	});

	test('item total plus tax equals the order total on the summary', async ({
		inventoryPage,
		checkoutPage,
	}) => {
		await inventoryPage.addToCart(BACKPACK);
		await inventoryPage.addToCart(BIKE_LIGHT);
		await inventoryPage.openCart();
		await checkoutPage.goToCheckout();
		await checkoutPage.fillInfo(
			checkoutInfo.firstName,
			checkoutInfo.lastName,
			checkoutInfo.postalCode,
		);
		await checkoutPage.continueToOverview();

		const totals = await checkoutPage.totals();
		expect(Number((totals.subtotal + totals.tax).toFixed(2))).toBe(
			totals.total,
		);
	});
});
