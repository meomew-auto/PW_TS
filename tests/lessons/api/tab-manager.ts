import { Page } from '@playwright/test';

export class TabManager {
  //Record -> object nhưng mà mình có thể tùy biến boa nhiêu phần tử cũng đc
  // phụ thuộc vào key và value
  //
  // Record<string, page>
  //{

  //     "invoice": page2,
  //     "popup": page3
  // }
  //tập hợp các tab và windows
  private tabs: Record<string, Page> = {};

  //lưu tên của tab đang active  có thể là string hoặc null
  private _currentName: string | null = null;

  get current(): Page | null {
    if (!this._currentName) return null;
    return this.tabs[this._currentName] || null;
  }

  get(name: string): Page | null {
    return this.tabs[name] || null;
  }

  get currentName(): string | null {
    return this._currentName;
  }

  //đếm số tab đang mở
  get count(): number {
    return Object.keys(this.tabs).length;
  }

  ///thêm tab hoặc windows popup
  add(name: string, page: Page): void {
    this.tabs[name] = page;

    //Nếu chưa có tab active (null) -> tab đầu tiên tự động là active
    if (this._currentName === null) {
      this._currentName = name;
    }

    console.log(`Added ${name} (Total: ${this.count})`);
  }

  //switch sang 1 tab khác
  //   page.bringToFront()
  async switchTo(name: string): Promise<Page> {
    const page = this.tabs[name];
    if (!page) {
      throw new Error(`Tab ${name} không tồn tại`);
    }
    //focus vào tab này
    await page.bringToFront();
    //cập nhật tên tab đang active

    this._currentName = name;

    console.log(`Switched to ${name}`);
    return page;
  }
  //page.close() -> đóng 1 cái tab
  async close(name: string): Promise<void> {
    const page = this.tabs[name];

    if (page) {
      await page.close();
      delete this.tabs[name];
      console.log(`Closed ${name}`);

      //Nếu vừa đong tab đang active
      if (this._currentName === name) {
        const remaining = Object.keys(this.tabs);
        this._currentName = remaining.length > 0 ? remaining[0] : null;
      }
    }
  }

  status(): void {
    console.log('TAB MANAGER STATUS');
    console.log(`Active ${this._currentName || 'none'}`);
    console.log(`Total ${this.count} tabs`);

    for (const name in this.tabs) {
      console.log(`Đang có ${this.tabs[name].url()} `);
    }
  }
}
