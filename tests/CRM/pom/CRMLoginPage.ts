import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
export class CRMLoginPage extends BasePage {
  //khai báo locator
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly h1Text = this.page.getByRole('heading', { level: 1 });

  async goto() {
    await this.page.goto('https://crm.anhtester.com/admin/authentication');
  }

  async expectOnPage(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.h1Text).toContainText('Login');
    await expect(this.page).toHaveURL(/admin\/authentication/);
  }
  async login(email: string, password: string) {
    this.logFill(this.emailInput);
    await this.emailInput.fill(email);
    this.logFill(this.passwordInput);
    await this.passwordInput.fill(password);
    this.logClick(this.loginButton);
    await this.loginButton.click();
    //1 số FW cũ sẽ dùng cách chuyển trang như thế này,
    //được gọi alf page chaining
    // if  /
    // else/
    // if(isADmin){
    //     return new adminPage
    // }esle{

    // return newDashboardPage();
    // }
    //taast cả user đc đưa tới trang newWelcomesplashpage()
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/admin/);
  }
}

//3 nhược điểm chính của page chanining
//1 vi phạm nguyên tắtcs trách nhiệm đơn lẻ
// đã ép thằng login page phải gánh thêm 2 trác nhiệm mới
// 1 biết logic để điều hướng
// 2. khởi tạo đối tượng
//
//2 tạo ra liên kết chặt chẽ (high coupling)
// thằng CRM login -> tự nhiênphuj thuộc vào thằng dashboard page

// ...//

// vấn đề thưucj tế:
// câu hỏi 1: điều gì xảy ra nếu đăng nhập tát bại?

// câu hỏi 2: 22/ điều gì xảy ra nếu sau khi login page admin admin page, còn user thường thì vào newDashnardpage
// khó bảo trì và kém linh hoạt
