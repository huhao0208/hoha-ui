import type { App } from 'vue';
export type ToastType = 'loading' | 'success' | 'fail' | 'text';
export type ToastPosition = 'top' | 'middle' | 'bottom';
export interface ToastOptions {
    message: string;
    type?: ToastType;
    position?: ToastPosition;
    duration?: number;
    forbidClick?: boolean;
    loadingType?: 'spinner' | 'circular';
}
export interface ToastInstance {
    close: () => void;
}
declare function toast(options: ToastOptions | string): ToastInstance;
declare namespace toast {
    var show: (options: ToastOptions | string) => ToastInstance;
    var loading: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    var success: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    var fail: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    var text: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    var clear: () => void;
    var install: (app: App) => void;
}
export default toast;
export { toast };
//# sourceMappingURL=index.d.ts.map