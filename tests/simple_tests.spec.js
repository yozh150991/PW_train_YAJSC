const { test, expect } = require('@playwright/test');

test.describe("Simple tests", () =>{
    test.beforeEach(async ({page}) =>{
        const username = page.getByTestId('username');
        const password = page.getByTestId('password');
        const login_btn = page.getByTestId('login-button');
        await page.goto('/');
        await username.fill('standard_user')
        await password.fill('secret_sauce');
        await login_btn.click();
    });
    test.afterEach(async ({page}) =>{
        await page.screenshot();
        await page.close();
    });
    
    test("Perform Login",async ({page}) =>{
        const product_title = page.locator('.title');
        const shoppingcart_icon = page.locator('.shopping_cart_link');
        const inventory_item = page.locator('.inventory_item');
        expect(await product_title).toBeVisible;
        expect(await product_title).toHaveText('Products');
        expect(await shoppingcart_icon).toBeVisible;
        expect(await inventory_item.count()).toBeGreaterThan(1);
    });
    test("Add product to the cart",async ({page}) =>{
        const addFirstItemToCart_btn = page.getByTestId('add-to-cart-sauce-labs-backpack');
        const shoppingCartBadge = page.locator('.shopping_cart_badge');
        const shoppingcart_icon = page.locator('.shopping_cart_link');
        const cartItem = page.textContent('.inventory_item_name');
        //let pickedItem = undefined;
        await addFirstItemToCart_btn.click();
        //pickedItem = addFirstItemToCart_btn.textContent();
        expect(await shoppingCartBadge.textContent()).toBe('1');
        await shoppingcart_icon.click();
        expect(await cartItem).toBe(/*pickedItem*/'Sauce Labs Backpack');
        await page.getByTestId('remove-sauce-labs-backpack').click();
        expect(await shoppingCartBadge.count()).toBe(0);
    });
})