import { defineStore } from 'pinia'

export const useDefaultStore = defineStore('main', {
  state: () => ({
    isMenuVisibleRight: false,
    isVisibleMainMenu: false,
    contentSidebarRight: ''
  }),

  actions: {
    toggleMenuRight(isVisible?: boolean) {
      if (isVisible === undefined) {
        this.isMenuVisibleRight = !this.isMenuVisibleRight
      } else {
        this.isMenuVisibleRight = isVisible
      }
    },
    toggleMainMenu(isVisible?: boolean) {
      if (isVisible === undefined) {
        this.isVisibleMainMenu = !this.isVisibleMainMenu
      } else {
        this.isVisibleMainMenu = isVisible
      }
    },
    setContentSidebarRight(payload: string) {
      this.contentSidebarRight = payload
    }
  },
})