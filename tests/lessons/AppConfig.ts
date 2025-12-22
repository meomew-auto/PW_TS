// Định nghĩa kiểu dữ liệu cho Config
interface AppConfig {
    env: string;
    baseUrl: string;
    getApiUrl: () => string;
    getHomeUrl: () => string;
}

export const appConfig: AppConfig = {
    env: 'staging',
    baseUrl: 'https://staging.example.com',

    // ✅ CÁCH 1: Function thường (Standard Function)
    // 'this' trỏ về chính object appConfig này.
    getApiUrl: function() {
        return `${this.baseUrl}/api/v1`; 
    },

    // ☠️ CÁCH 2: Arrow Function trong Object Literal
    // Arrow Function KHÔNG có 'this' riêng. Nó lấy 'this' của phạm vi bao quanh (Module scope/Global).
    // Trong file TS module, 'this' này thường là undefined.
    getHomeUrl: () => {
        // @ts-ignore: TypeScript sẽ cảnh báo lỗi này, nhưng nếu ép chạy...
        return `${this.baseUrl}/home`; // ❌ LỖI: this.baseUrl is undefined
    }
};