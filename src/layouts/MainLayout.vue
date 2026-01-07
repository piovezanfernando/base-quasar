<template>
  <q-layout view="hHh Lpr lff" class="bg-slate-50">
    <q-header class="glass-header text-slate-900" height-hint="98">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" class="text-indigo-600" />

        <q-toolbar-title class="text-weight-bold row items-center no-wrap">
          <q-icon name="auto_awesome" color="indigo-600" size="sm" class="q-mr-sm" />
          <span class="text-slate-800">API Forge</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="slate-600" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
            <q-tooltip>Fullscreen</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="slate-600" :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            @click="$q.dark.toggle()">
            <q-tooltip>Alternar Tema</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="slate-600" icon="notifications">
            <q-badge color="rose-500" text-color="white" floating rounded>
              5
            </q-badge>
            <q-menu transition-show="jump-down" transition-hide="jump-up" class="glass-card shadow-2xl">
              <q-list style="min-width: 280px" class="q-pa-sm">
                <div class="text-subtitle1 text-weight-bold q-mb-sm q-px-sm">Notifications</div>
                <q-separator q-mb-sm />
                <q-item clickable v-ripple class="rounded-borders q-mb-xs">
                  <q-item-section avatar>
                    <q-avatar color="indigo-50" text-color="indigo" icon="bolt" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Build Finished</q-item-label>
                    <q-item-label caption>Your new API is ready</q-item-label>
                  </q-item-section>
                </q-item>
                <q-btn label="View All" flat dense class="full-width q-mt-sm text-indigo-600" />
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat class="q-ml-sm">
            <q-avatar size="36px" class="shadow-sm border-2">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-menu transition-show="scale" transition-hide="scale" class="glass-card shadow-2xl">
              <q-list style="min-width: 150px" class="q-pa-sm">
                <q-item clickable v-ripple class="rounded-borders">
                  <q-item-section avatar><q-icon name="person" /></q-item-section>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-separator class="q-my-sm" />
                <q-item clickable v-ripple class="rounded-borders text-rose-600">
                  <q-item-section avatar><q-icon name="logout" /></q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>


    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="280" class="bg-white">
      <q-scroll-area class="fit">
        <q-list padding class="q-px-md q-mt-md">
          <div class="text-overline text-slate-400 q-px-sm q-mb-sm">MAIN MENU</div>

          <q-item to="/" clickable v-ripple class="sidebar-item q-mb-sm" active-class="sidebar-item-active">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-expansion-item icon="admin_panel_settings" label="Management" class="sidebar-expansion q-mb-sm">
            <q-list class="q-pl-md">
              <q-item to="/Profile" clickable v-ripple class="sidebar-subitem q-mb-xs"
                active-class="sidebar-item-active">
                <q-item-section avatar><q-icon name="account_circle" size="xs" /></q-item-section>
                <q-item-section>User Profile</q-item-section>
              </q-item>
              <q-item to="/Maintenance" clickable v-ripple class="sidebar-subitem q-mb-xs"
                active-class="sidebar-item-active">
                <q-item-section avatar><q-icon name="settings" size="xs" /></q-item-section>
                <q-item-section>Maintenance</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="storage" label="Database Modules" class="sidebar-expansion" default-opened>
            <q-list class="q-pl-md">
              <q-item v-for="item in menuItems" :key="item.name" clickable v-ripple class="sidebar-subitem q-mb-xs"
                :active="tabsStore.activeTabId === item.name" active-class="sidebar-item-active"
                @click="openModuleTab(item.name, item.label, item.page)">
                <q-item-section avatar><q-icon :name="item.icon" size="xs" /></q-item-section>
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- Global Tabs Bar (Moved from Header) -->
      <div v-if="tabsStore.tabs.length > 0" class="bg-slate-50 border-b border-slate-200 sticky pl-md">
        <q-tabs v-model="tabsStore.activeTabId" align="left" class="text-slate-600" active-color="indigo-600"
          indicator-color="indigo-600" dense inline-label outside-arrows mobile-arrows>
          <q-tab v-for="tab in tabsStore.tabs" :key="tab.id" :name="tab.id" class="q-px-lg" no-caps>
            <div class="row items-center no-wrap">
              <q-icon v-if="tab.icon" :name="tab.icon" size="xs" class="q-mr-sm" />
              <div class="ellipsis" style="max-width: 200px">{{ tab.label }}</div>
              <q-btn icon="close" flat round dense size="xs" color="slate-400"
                class="q-ml-sm opacity-50 hover:opacity-100 transition-opacity"
                @click.stop="tabsStore.closeTab(tab.id)" />
            </div>
          </q-tab>
        </q-tabs>
      </div>

      <!-- Mode 1: Route View (Dashboard, etc) -->
      <router-view v-slot="{ Component }" v-if="!tabsStore.activeTabId">
        <component :is="Component" />
      </router-view>

      <!-- Mode 2: Tab View (Modules) -->
      <q-tab-panels v-else v-model="tabsStore.activeTabId" animated transition-prev="fade" transition-next="fade"
        class="bg-transparent" keep-alive>
        <q-tab-panel v-for="tab in tabsStore.tabs" :key="tab.id" :name="tab.id" class="q-pa-none">
          <component :is="availableComponents[tab.componentName]" />
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useGlobalTabsStore } from 'stores/globalTabs';
import menuConfig from 'assets/menu-config.json';

// Use Vite's glob import to load all page components
const pageModules = import.meta.glob('../pages/*.vue');

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const tabsStore = useGlobalTabsStore();

    // Map component names to loaded modules
    const availableComponents: Record<string, any> = {};
    const menuItems = computed(() => {
      return menuConfig.filter(item => item.page); // Only items with page component
    });

    // Load components from glob imports
    menuItems.value.forEach((item: any) => {
      const modulePath = `../pages/${item.component}`;
      const moduleLoader = pageModules[modulePath];

      if (moduleLoader) {
        moduleLoader().then((module: any) => {
          availableComponents[item.page] = module.default;
        }).catch((err) => {
          console.error(`Failed to load component ${item.component}:`, err);
        });
      }
    });

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function openModuleTab(id: string, label: string, componentName: string) {
      tabsStore.openTab({
        id,
        label,
        componentName,
        icon: 'list_alt'
      });
    }

    // Watcher: Return to Dashboard if all tabs are closed
    watch(() => tabsStore.activeTabId, (newVal) => {
      if (!newVal) {
        router.push('/');
      }
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      tabsStore,
      openModuleTab,
      availableComponents,
      menuItems
    };
  }
});
</script>

<style lang="scss">
.bg-slate-50 {
  background-color: #f8fafc;
}

.sidebar-item {
  border-radius: 12px;
  color: #64748b;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5f9;
    color: #4f46e5;
  }
}

.sidebar-subitem {
  border-radius: 10px;
  color: #64748b;
  min-height: 40px;
  font-size: 0.9em;
}

.sidebar-item-active {
  background: #eef2ff !important;
  color: #4f46e5 !important;
  font-weight: 600;

  .q-icon {
    color: #4f46e5;
  }
}

.sidebar-expansion {
  border-radius: 12px;
  color: #64748b;

  .q-item {
    border-radius: 12px;
  }
}

.border-2 {
  border: 2px solid #fff;
}
</style>
