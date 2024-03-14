const { test, expect } = require('@playwright/test');

test.describe("Adding and removing product from the cart for authorized user", () =>{
    test.beforeEach(async ({page}) =>{
        const username = page.locator('#user-name');
        const password = page.locator('#password');
        const login_btn = page.locator('#login-button');
        await page.goto('https://www.saucedemo.com/');
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
        const addFirstItemToCart_btn = page.locator('#add-to-cart-sauce-labs-backpack');
        const shoppingCartBadge = page.locator('.shopping_cart_badge');
        const shoppingcart_icon = page.locator('.shopping_cart_link');
        const cartItem = page.textContent('.inventory_item_name');
        await addFirstItemToCart_btn.click();
        expect(await shoppingCartBadge.textContent()).toBe('1');
        await shoppingcart_icon.click();
        expect(await cartItem).toBe('Sauce Labs Backpack');
        await page.locator('#remove-sauce-labs-backpack').click();
        expect(await shoppingCartBadge.count()).toBe(0);
    });
})