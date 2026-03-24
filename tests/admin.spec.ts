
import test, { expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'

test.describe("TC: Admin page test", () =>{
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        // await loginPage.isLoginSuccessfull()

        const homePage = new HomePage(page)
        await page.waitForURL("**/dashboard**", {timeout: 30000})
        await homePage.clickMenuAdmin()
    })

    test("TC1: Filter admin user", async ({page}) => {
        const adminPage = new AdminPage(page)

        await adminPage.filterAdminUser("Admin")
        await adminPage.selectAdminRole()
        await adminPage.clickSearchButton()

        await adminPage.waitForLoadingSpinnerToDisappear()

        // verify kết quả filter ra đúng user Admin
        const rowCount = await adminPage.countRows()
        expect(rowCount).toBeGreaterThan(0)

        // expect(true).toBeTruthy()
    })
})