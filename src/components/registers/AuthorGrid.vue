<template>
    <div>
        <q-table
                title="Author"
                :rows="responseData?.data?.data"
                :columns="columns"
                row-key="id"
                :loading="loading"
                selection="none"
                v-model:pagination="paginationModel"
                @update:pagination="onPagination"
                hide-pagination
        >
            <template #body-cell-is_active="props">
                <q-td :props="props">
                    <div>
                        <q-toggle :model-value="props['row'].is_active" color="primary" disable></q-toggle>
                    </div>
                </q-td>
            </template>
            <template v-slot:top-right>
                <q-btn label="Adicionar" icon="add" @click="openNew()" flat text-color="white" class=" q-my-lg bg-green-7" />
            </template>
            <template v-slot:top-left>
                <div>
                    <h5>Autor</h5>

                    <span>Total de registros: {{ responseData?.data.total }}</span>

                </div>
            </template>
            <template v-slot:loading>
                <q-inner-loading showing color="primary" size="5.5em" />
            </template>
            <template v-slot:body-cell-edit="props">
                <q-td :props="props" style="width: 1%">
                    <q-btn icon="edit" round color="primary" @click="onEditClick(props['row'])" size="sm" flat />
                </q-td>
            </template>
        </q-table>
        <div class="row justify-end">
            <div class="col-4 q-mt-md">
                <q-pagination
                        v-model="pagination.page"
                        color="grey-8"
                        :max="responseData?.data?.last_page"
                        size="md"
                        @update:model-value="changePage"
                        boundary-numbers
                        :max-pages="6"
                        direction-links
                />
            </div>
            <div class="col-2"></div>
            <div class="col-1">
                <q-select
                        v-model="paginationModel.rowsPerPage"
                        :options="pageOptions"
                        label="Páginas"
                        @update:model-value="changeRowPerPage"
                />
            </div>
        </div>
        <q-drawer v-if="drawerVisible"
                  side="right"
                  v-model="drawerVisible"
                  elevated
                  :width="735"
                  mini-to-overlay
        >
            <default-form :model="rowData" routeApi='authors/' component="author-form"></default-form>
        </q-drawer>
    </div>
</template>
<script lang="ts">
  import defaultService from 'src/api/default';
  import { useFormStore } from 'stores/form';
  import { computed, ref } from 'vue';
  import { ApiResponse, DefaultRequest } from 'src/models/default';
  import { AuthorData, AuthorResponse } from 'src/models/author';
  import DefaultForm from 'components/forms/defaultForm.vue';
  import { useFilterStore } from 'stores/filter';

  export default {
    name: 'GridAuthor',
    components: { DefaultForm },
    setup() {
      const generateColumnStyle = (maxWidth) => {
        return `max-width: ${maxWidth}px; overflow: hidden; text-overflow: ellipsis;`;
      };
      const columns = [
        {name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left', style: generateColumnStyle(150)},
        {name: 'is_active', label: 'Ativo', field: 'is_active', align: 'left' },
        {name: 'edit', label: 'Editar' }
      ];
      const pagination = ref<DefaultRequest>({
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        fields: ''
      });
      const formStore = useFormStore();
      const filterStore = useFilterStore();
      const responseData = ref<ApiResponse<AuthorResponse> | null>(null);
      const loading = ref(true);
      const pageOptions = [5, 15, 30, 50, 100];
      const rowData = ref<AuthorData | null>({
        id: undefined,
        name: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
        created_by: 0,
        updated_by: 0,
        deleted_by: 0,
        company_id: 0
      });
      const { getAll } = defaultService();
      const paginationModel = pagination.value;

      formStore.$subscribe((_, state) => {
        if (state.isRefresh === true) {
          fetchFromServer();
        }
      });

      filterStore.$subscribe((_, state) => {
        if (state.filter !== null) {
          fetchFromServer();
        }
      });
      const fetchFromServer = () => {
        loading.value = true;
        let filter = filterStore.getFilterName();
        getAll<AuthorResponse>('authors', filter, paginationModel, (res: ApiResponse<AuthorResponse>) => {
          responseData.value = res;
          setTimeout(() => {
            loading.value = false;
          }, 900);
        });

      };
      const openNew = () => {
        rowData.value = {};
        formStore.setIsVisible(true);
        formStore.setIsDisable(false);

      };
      const onEditClick = (row: AuthorData) => {
        rowData.value = row;
        formStore.setIsVisible(true);
      };
      const changePage = (page: number) => {
        paginationModel.page = page;
        fetchFromServer();

      };
      const onPagination = (params: any) => {
        Object.assign(paginationModel, params);
        fetchFromServer();

      };
      const changeRowPerPage = (page: number) => {
        paginationModel.rowsPerPage = page;
        fetchFromServer();

      };

      return {
        loading,
        pagination,
        pageOptions,
        columns,
        rowData,
        responseData,
        drawerVisible: computed(() => formStore.isVisible),
        openNew,
        onEditClick,
        changePage,
        fetchFromServer,
        onPagination,
        paginationModel,
        changeRowPerPage
      };
    }
  };
</script>