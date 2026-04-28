import { test, expect } from '@playwright/test';

test.describe('Package Configurator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/custom-packet');
    });

    test('increment updates summary', async ({ page }) => {
        const incBtn = page.getByTestId('increment-st-pad-std');
        await incBtn.click();
        await expect(page.getByTestId('quantity-st-pad-std')).toHaveText('10');
        await expect(page.getByTestId('summary-row-st-pad-std')).toBeVisible();
    });

    test('decrement is disabled at 0', async ({ page }) => {
        const decBtn = page.getByTestId('decrement-st-pad-std');
        await expect(decBtn).toBeDisabled();
    });

    test('handles multiple subTypes correctly', async ({ page }) => {
        await page.getByTestId('increment-st-pad-std').click();
        await page.getByTestId('increment-st-pad-super').click();
        
        await expect(page.getByTestId('summary-row-st-pad-std')).toBeVisible();
        await expect(page.getByTestId('summary-row-st-pad-super')).toBeVisible();
    });


    test('optimization handles 40 items correctly', async ({ page }) => {
        const incBtn = page.getByTestId('increment-st-pad-std');
        for(let i=0; i<4; i++) await incBtn.click(); 
        

        await expect(page.getByTestId('summary-total')).toHaveText('378 TL');
    });

    test('optimization handles 20 items correctly', async ({ page }) => {
        const incBtn = page.getByTestId('increment-st-pad-std');
        for(let i=0; i<2; i++) await incBtn.click(); 
        
        await expect(page.getByTestId('summary-total')).toHaveText('190 TL');
    });


    test('optimization handles 60 items correctly', async ({ page }) => {
        const incBtn = page.getByTestId('increment-st-pad-std');
        for(let i=0; i<6; i++) await incBtn.click(); 
        

        await expect(page.getByTestId('summary-total')).toHaveText('556 TL');
    });

    test('tab state is preserved', async ({ page }) => {
        await page.getByTestId('tab-daily').click();
        await page.getByTestId('increment-st-panty-std').click();
        await page.getByTestId('tab-menstrual').click();
        await page.getByTestId('tab-daily').click();
        await expect(page.getByTestId('quantity-st-panty-std')).toHaveText('10');
    });

    test('add to cart is disabled when empty', async ({ page }) => {
        await expect(page.getByTestId('add-to-cart')).toBeDisabled();
        await page.getByTestId('increment-st-pad-std').click();
        await expect(page.getByTestId('add-to-cart')).toBeEnabled();
    });
});


test.describe('Promo Code Tests', () => {

    test('shows valid code from URL', async ({ page }) => {
        await page.goto('/custom-packet?promoCode=BEIJE20');
        await expect(page.getByTestId('promo-ready-code')).toBeVisible();
    });


    test('URL promo applies automatically or manually correctly', async ({ page }) => {
        await expect(page.getByTestId('promo-apply-ready')).toBeVisible();
        await page.getByTestId('promo-apply-ready').click();
        await expect(page.getByTestId('promo-remove')).toBeVisible();
    });

    test('remove promo does not clear price correctly (bug 2)', async ({ page }) => {
        const incBtn = page.getByTestId('increment-st-pad-std');
        await incBtn.click(); // 10 TL -> normalde 100
        
        await page.getByTestId('promo-input').fill('FLAT50');
        await page.getByTestId('promo-apply-manual').click();
        
        await page.getByTestId('promo-remove').click();

        await expect(page.getByTestId('summary-total')).toHaveText('100 TL');
    });

    test('manual valid code shows discount', async ({ page }) => {
        await page.goto('/custom-packet');
        const incBtn = page.getByTestId('increment-st-pad-std');
        await incBtn.click();
        await page.getByTestId('promo-input').fill('FLAT50');
        await page.getByTestId('promo-apply-manual').click();
        await expect(page.getByTestId('summary-discount')).toBeVisible();
    });

    test('manual invalid code shows error', async ({ page }) => {
        await page.goto('/custom-packet');
        await page.getByTestId('promo-input').fill('INVALID');
        await page.getByTestId('promo-apply-manual').click();
        await expect(page.getByTestId('promo-error')).toBeVisible();
    });
});
