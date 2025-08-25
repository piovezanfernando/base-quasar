<template>
    <div>
        <q-page padding>
            <default-filter v-if="showFilter" grid-name="Book" :fields="fieldOptions"></default-filter>
            <grid-book class="q-pt-md"></grid-book>
            <q-page-sticky position="bottom-right" :offset="[25,25]">
                <q-btn fab :icon="icon" color="primary" @click="showFilter = !showFilter"/>
            </q-page-sticky>
        </q-page>
    </div>
</template>

<script lang="ts">
  import GridBook from 'components/registers/BookGrid.vue';
  import { dom } from 'quasar';
  import { computed, ref } from 'vue';
  import DefaultFilter from 'components/filters/DefaultFilter.vue';

  export default {
    name: 'BookPage',
    components: { DefaultFilter, GridBook },
    setup() {
      const filter = ref('');
      const { width } = dom;
      const showFilter = ref(false);
      const icon = computed(() => showFilter.value ? 'close' : 'search');
      const fieldOptions = [
        {label: 'Ativo', value: 'is_active', type: 'boolean'},
        {label: 'Data de Criação', value: 'created_at', type: 'date'},
        {label: 'Título', value: 'title', type: 'string'},
        {label: 'Editora', value: 'publisher', type: 'string'},
        {label: 'Edição', value: 'edition', type: 'number'},
        {label: 'Ano de publicação', value: 'year', type: 'string'}
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