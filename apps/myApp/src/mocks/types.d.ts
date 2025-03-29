// 声明 h5-init 模块的类型
declare module '*mocks/h5-init' {
  export const worker: any;
  export function setupH5MockService(): Promise<void>;
}

// 声明 miniapp-init 模块的类型
declare module '*mocks/miniapp-init' {
  export function setupMiniAppMock(): void;
}

// 声明 handlers 模块的类型
declare module '*mocks/handlers' {
  export const handlers: any[];
} 