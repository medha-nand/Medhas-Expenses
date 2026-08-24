// @ts-check
import { test, expect } from '@playwright/test';

test('submits a Leela Palace Trail itinerary enquiry', async ({ page }) => {
  await page.goto('https://www.theleela.com/special-offers/the-leela-palace-trail');
  await expect(page).toHaveTitle(/The Leela Palace Trail/);

  await page.getByRole('link', { name: 'ENQUIRE NOW' }).first().click();
  await page.getByText('I know my Itinerary', { exact: true }).click();

  const form = page.locator('#knowItinerary-Form');

  await form.locator('#destination1addrow0').selectOption({
    label: 'The Leela Palace New Delhi',
  });
  await form.locator('#numberRooms1addrow0').selectOption({ label: '1 Room' });
  await selectDateRange(form, '#duration1addrow0', '2026-09-01', '2026-09-04');

  await form.locator('#destination1addrow1').selectOption({
    label: 'The Leela Palace Jaipur',
  });
  await form.locator('#numberRooms1addrow1').selectOption({ label: '1 Room' });
  await selectDateRange(form, '#duration1addrow1', '2026-09-04', '2026-09-06');

  await page.evaluate(() => {
    for (const id of ['noGuests1addrow0', 'noGuests1addrow1']) {
      const input = document.querySelector(`#knowItinerary-Form #${id}`);
      if (!input) throw new Error(`Guest field not found: ${id}`);
      input.value = '2 Guests';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await form.locator('#namefld-know').fill('Test Traveller');
  await form.locator('#company-know').fill('Playwright Test');
  await form.locator('#email-know').fill('playwright.test@example.com');

  await form.locator('.iti__selected-flag').click();
  await form.locator("li[data-country-code='in']").click();
  await form.locator('#phone2').fill('9876543210');
  await form.locator('textarea').fill('Synthetic test enquiry for itinerary flow.');
  await form.locator('#edit-subscribe-know').check();

  await form.locator("input[value='SUBMIT']").click();
  await expect(form.locator('#phone2')).toHaveValue('9876543210');
  await page.pause()
}); 

async function selectDateRange(form, inputSelector, startDate, endDate) {
  await form.locator(inputSelector).click();
  await form.locator(
    `.date-picker-wrapper:visible .day.toMonth[class*='${startDate}']`,
  ).click();
  await form.locator(
    `.date-picker-wrapper:visible .day.toMonth[class*='${endDate}']`,
  ).click();
}
