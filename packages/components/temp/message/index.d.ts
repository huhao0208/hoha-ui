import type { App } from 'vue';
export type MessageType = 'success' | 'error' | 'warning' | 'info';
export interface MessageOptions {
    message: string;
    type?: MessageType;
    duration?: number;
}
export interface MessageInstance {
    close: () => void;
}
declare const message: {
    success: (msg: string, duration?: number) => MessageInstance;
    error: (msg: string, duration?: number) => MessageInstance;
    warning: (msg: string, duration?: number) => MessageInstance;
    info: (msg: string, duration?: number) => MessageInstance;
    install: (app: App) => void;
};
export default message;
export { message };
//# sourceMappingURL=index.d.ts.map