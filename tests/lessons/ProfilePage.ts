import { Page, Locator } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly saveBtn: Locator;
    readonly successMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.saveBtn = page.locator('button.save');
        this.successMsg = page.locator('.alert-success');
    }

    // --- METHOD THƯỜNG (Tiết kiệm RAM,    // 2. Method thường (Sẽ bị mất this nếu truyền đi lung tung)
    async clickSave() {
        // GIẢ LẬP CLICK (Thay vì click thật)
        console.log("   -> Đang click Save...");
        
        // ❌ Điểm chết: Gọi this.saveBtn
        // Nếu mất this -> this là undefined -> Crash ngay lập tức
        if (!this.saveBtn) {
            throw new Error("MẤT THIS RỒI! this.saveBtn không tồn tại.");
        }

        // Nếu this còn sống -> Giả vờ click thành công
        await new Promise(r => setTimeout(r, 500)); 
        console.log("   -> Click thành công!");
    }

    // Hàm này kiểm tra xem thông báo thành công có hiện không
    // (Dễ bị lỗi nếu truyền đi làm callback)
    async isSuccessVisibleRegular() {
        console.log("   -> Checking visibility (Regular)...");
        // ⚠️ Nguy hiểm: Cần 'this.successMsg'
        return await this.successMsg.isVisible();
    }

    // --- ARROW PROPERTY (An toàn cho Callback) ---

    // Hàm này cũng kiểm tra thông báo, nhưng được "đóng gói" an toàn
    isSuccessVisibleArrow = async (): Promise<boolean> => {
        console.log("   -> Checking visibility (Arrow)...");
        // ✅ An toàn: 'this' bị hàn chết vào instance ProfilePage
        return await this.successMsg.isVisible();
    }
}