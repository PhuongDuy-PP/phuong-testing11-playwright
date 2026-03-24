
import test, { expect } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs'

test.describe("Get by role test", () => {
    test("Demo get by role", async ({page}) => {
        // B1: đọc file HTML có chứa element cần lấy

        // đường dẫn tới file HTML
        const htmlPath = path.join(__dirname, "fixtures", "getbyrole-demo.html")
        // đọc file HTML và load vào page của Playwright
        const htmlContent = fs.readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent)

        // getbyrole có 2 params
        // - param 1: role của element cần lấy: button, heading, link, textbox,...
        // - param 2: thêm các option để xác định chính xác element
        // name: text hiển thị trên element (text hiển thị, aria-label, title, placeholder, alt,...)
        // level (chỉ áp dụng cho heading): thẻ h1, h2, h3,... tương ứng với level 1, 2, 3,...
        // exact: true/false, mặc định là false, nếu true thì text phải khớp hoàn toàn, nếu false thì text chỉ cần chứa là được
    
        // heading: h1, h2, h3,...
        // <h1>Test getByRole - Playwright Demo</h1>
        const heading1 = page.getByRole("heading", {
            name: "Test getByRole - Playwright Demo",
            level: 1,
            exact: true
        })
        await expect(heading1).toBeVisible()
    })
})