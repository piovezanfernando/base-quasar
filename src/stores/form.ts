import { defineStore } from 'pinia';

export const useFormStore = defineStore('formStore', {
  state: () => ({
    isDisable: true,
    isVisible: false,
    isRefresh: false
  }),

  actions: {
    setIsDisable(newValue: boolean) {
      this.isDisable = newValue;
    },
    setIsVisible(newValue: boolean) {
      this.isVisible = newValue;
    },
    setIsRefresh(newValue: boolean) {
      this.isRefresh = newValue;
      setTimeout(() => {
        this.isRefresh = false;
      }, 50);
    }
  }
});
