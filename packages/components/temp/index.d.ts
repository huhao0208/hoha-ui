export { default as HoButton } from './button/index.vue';
export { default as HoInput } from './input/index.vue';
export { default as HoIcon } from './icon/index.vue';
export { default as HoModal } from './modal/index.vue';
export { message, default as HoMessage } from './message';
export { toast, default as HoToast } from './toast';
export type { MessageType, MessageOptions, MessageInstance } from './message';
export type { ToastType, ToastPosition, ToastOptions, ToastInstance } from './toast';
import type { App } from 'vue';
declare const _default: {
    install(app: App): void;
};
export default _default;
//# sourceMappingURL=index.d.ts.map