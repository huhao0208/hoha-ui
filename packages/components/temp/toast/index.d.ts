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
declare const toast: {
    show: (options: ToastOptions | string) => ToastInstance;
    loading: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    success: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    fail: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    text: (message: string, options?: Partial<ToastOptions>) => ToastInstance;
    clear: () => void;
    install: (app: App) => void;
};
export default toast;
export { toast };
//# sourceMappingURL=index.d.ts.map