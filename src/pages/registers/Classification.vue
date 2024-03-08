<template>
  <div>
    <q-page padding>
      <default-filter v-if="showFilter" grid-name="Classificação" :fields="fieldOptions"></default-filter>
      <grid-classification class="q-pt-md"></grid-classification>
      <q-page-sticky position="bottom-right" :offset="[25,25]">
        <q-btn fab :icon="icon" color="primary" @click="showFilter = !showFilter"/>
      </q-page-sticky>
    </q-page>
  </div>
</template>

<script lang="ts">
import GridClassification from 'components/registers/ClassificationGrid.vue';
import { dom } from 'quasar';
import { computed, ref } from 'vue';
import DefaultFilter from 'components/filters/DefaultFilter.vue';

export default {
  name: 'ClassificationPage',
  components: { DefaultFilter, GridClassification },
  setup() {
    const filter = ref('');
    const { width } = dom;
    const showFilter = ref(false);
    const icon = computed(() => showFilter.value ? 'close' : 'search');
    const fieldOptions = [
      {
        label: 'Nome',
        value: 'name',
        type: 'string'
      },
      {
        label: 'Data de criação',
        value: 'created_at',
        type: 'date'
      },
      {
        label: 'Ativo',
        value: 'is_active',
        type: 'boolean'
      }
    ];

    return {
      filter,
      drawerLeft: width,
      showFilter,
      icon,
      fieldOptions
    };
  }
};
</script>

<style>
table tr:hover {
  background: #F9F9FA;
}
body{
  background-color: #F9F9FA;
}
</style>