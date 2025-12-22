import { chromium } from '@playwright/test';
import { appConfig } from './AppConfig.js';
import { ProfilePage } from './ProfilePage.js';

// --- HELPER FUNCTION (Kẻ hủy diệt 'this') ---
async function retryAction(action: () => Promise<boolean | void>, attempts: number = 3) {
    console.log("[System] Bắt đầu cơ chế Retry...");
    
    try {
        await action(); 
        console.log("[System] ✅ Action thành công!");
    } catch (e: any) {
        console.log(`[System] ❌ Lỗi xảy ra: ${e.message}`);
    }
}

// --- MAIN FUNCTION ---
async function main() {
    // 1. Setup Playwright
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Khởi tạo Page Object
    const profilePage = new ProfilePage(page);
    await profilePage.clickSave();
    console.log("\n--- TEST 1: OBJECT LITERAL ---");
    console.log("API Url:", appConfig.getApiUrl()); 

    console.log("\n--- TEST 2: CLASS & RETRY (MẤT THIS) ---");

    // ❌ Case 1: Truyền Method thường (Sẽ mất this)
    console.log("🔸 Case 1: Truyền Method thường (Sẽ chết)");
    await retryAction(profilePage.clickSave); 

    console.log("\n--------------------------------");

    // ✅ Case 2: Dùng Wrapper (Cứu cánh)
    console.log("🔸 Case 2: Dùng Wrapper cho Method thường (Sống)");
    await retryAction(async () => {
        await profilePage.clickSave();
    });

    console.log("\n--------------------------------");

    // ✅ Case 3: Dùng Arrow Property
    console.log("🔸 Case 3: Dùng Arrow Property định nghĩa sẵn trong Class");
    await retryAction(profilePage.isSuccessVisibleArrow);

    await browser.close();
}

// Gọi hàm main
main();