import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
  state: () => ({
    isLoading: false,
    filter: null as string | null
  }),
  actions: {
    setFilterName(filter: string) {
      this.filter = filter;
    },
    clearFilter() {
      this.filter = '';
    },
    getFilterName() {
      return this.filter;
    },
  },
});