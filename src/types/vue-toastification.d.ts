// src/types/vue-toastification.d.ts
declare module 'vue-toastification' {
    import { Plugin } from 'vue';

    export const POSITION: {
      TOP_LEFT: string;
      TOP_CENTER: string;
      TOP_RIGHT: string;
      BOTTOM_LEFT: string;
      BOTTOM_CENTER: string;
      BOTTOM_RIGHT: string;
    };

    export interface ToastInterface {
      success(message: string, options?: object): void;
      error(message: string, options?: object): void;
      info(message: string, options?: object): void;
      warning(message: string, options?: object): void;
    }

    export function useToast(): ToastInterface;

    export const plugin: Plugin;
    export default plugin;
  }
