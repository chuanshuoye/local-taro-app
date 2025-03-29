// 为动态导入的模块提供类型声明
declare module '*/mocks/h5-init' {
  export function setupH5MockService(): Promise<void>;
}

declare module '*/mocks/miniapp-init' {
  export function setupMiniAppMock(): void;
} 