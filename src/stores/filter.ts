import { defineStore } from 'pinia';

export const useFilterStore = defineStore({
  id: 'filter',
  state: () => ({
    isLoading: false,
    filter: null
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