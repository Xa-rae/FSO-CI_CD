// @ts-check
import { test, expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'

test.describe('basic functions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page.getByText('Welcome')).toBeVisible()
  })

  test('can access /messages', async ({ page }) => {
    await page.getByRole('link', { name: 'Messages' }).click()
    await expect(page.getByRole('heading', { name: 'Messages' })).toBeVisible()
  })

  test('can add a message', async ({ page }) => {
    const message = `Hello world! ${randomUUID()}`

    await page.getByRole('link', { name: 'Messages' }).click()
    await page.getByRole('textbox').fill(message)
    await page.getByRole('button', { name: 'Send!' }).click()

    const messageItem = page.getByRole('listitem').filter({ hasText: message })
    await expect(messageItem).toBeVisible()
  })

  test('can delete a message', async ({ page }) => {
    const message = `Hello world! ${randomUUID()}`

    await page.getByRole('link', { name: 'Messages' }).click()
    await page.getByRole('textbox').fill(message)
    await page.getByRole('button', { name: 'Send!' }).click()

    await page.getByText(message).getByRole('button', { name: 'delete' }).click()
    await expect(page.getByText(message)).not.toBeVisible()
  })
})
