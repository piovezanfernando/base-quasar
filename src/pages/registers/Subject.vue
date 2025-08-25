<template>
    <div>
        <q-page padding>
            <default-filter v-if="showFilter" grid-name="Subject" :fields="fieldOptions"></default-filter>
            <grid-subject class="q-pt-md"></grid-subject>
            <q-page-sticky position="bottom-right" :offset="[25,25]">
                <q-btn fab :icon="icon" color="primary" @click="showFilter = !showFilter"/>
            </q-page-sticky>
        </q-page>
    </div>
</template>

<script lang="ts">
  import GridSubject from 'components/registers/SubjectGrid.vue';
  import { dom } from 'quasar';
  import { computed, ref } from 'vue';
  import DefaultFilter from 'components/filters/DefaultFilter.vue';

  export default {
    name: 'SubjectPage',
    components: { DefaultFilter, GridSubject },
    setup() {
      const filter = ref('');
      const { width } = dom;
      const showFilter = ref(false);
      const icon = computed(() => showFilter.value ? 'close' : 'search');
      const fieldOptions = [
        {label: 'Ativo', value: 'is_active', type: 'boolean'},
        {label: 'Data de Criação', value: 'created_at', type: 'date'},
        {label: 'Description', value: 'description', type: 'string'}
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