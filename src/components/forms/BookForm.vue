<template>
  <q-input
    v-model="formData.id"
    label="Id"
    outlined
    class="q-mb-md"
    disable
    readonly
  />
  <q-input
    v-model="formData.title"
    label="Título do livro"
    outlined
    clearable
    :disable="formStore.isDisable"
    :readonly="formStore.isDisable"
    :rules="[(val: string) => requiredField(val)]"
  />
  <q-input
    v-model="formData.publisher"
    label="Editora"
    outlined
    clearable
    :disable="formStore.isDisable"
    :readonly="formStore.isDisable"
    :rules="[(val: string) => requiredField(val)]"
  />
  <q-input
    v-model="formData.edition"
    label="Edição"
    outlined
    clearable
    :disable="formStore.isDisable"
    :readonly="formStore.isDisable"
    :rules="[(val: string) => requiredField(val)]"
  />
  <q-input
    v-model="formData.year"
    label="Ano de publicação"
    outlined
    clearable
    :disable="formStore.isDisable"
    :readonly="formStore.isDisable"
    :rules="[(val: string) => requiredField(val)]"
  />
  <!-- Multiselect de Autores -->
  <q-select
    v-model="authorsIds"
    :options="authorOptions"
    option-label="name"
    option-value="id"
    emit-value
    map-options
    multiple
    use-chips
    outlined
    label="Autores"
    :disable="formStore.isDisable"
    :readonly="formStore.isDisable"
    :loading="loadingAuthors"
    clearable
    class="q-mt-md"
    :rules="[(val: number[]) => requiredArray(val)]"
  />
  <!-- Multiselect de Assuntos -->
  <q-select
    v-model="subjectsIds"
    :options="subjectOptions"
    option-label="description"
    option-value="id"
    emit-value
    map-options
    multiple
    use-chips
    outlined
    label="Assuntos"
    :disable="formStore.isDisable"
    :readonly="formStore.isDisable"
    :loading="loadingSubjects"
    clearable
    class="q-mt-md"
    :rules="[(val: number[]) => requiredArray(val)]"
  />
</template>
<script lang="ts">
import defaultService from 'src/api/default';
import { DefaultRequest } from 'src/models/default';
import { useFormStore } from 'stores/form';
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { required } from 'src/utils/validations';

export default {
  name: 'BookForm',
  props: ['model'],
  setup(props) {
    const { model } = toRefs(props);
    const formData = ref<any>(model.value);
    const formStore = useFormStore();
    const requiredField = required;

    // Opções e seleções para os multiselects
    const authorOptions = ref<Array<{ id: number; name: string }>>([]);
    const subjectOptions = ref<Array<{ id: number; description: string }>>([]);
    const authorsIds = ref<number[]>([]);
    const subjectsIds = ref<number[]>([]);
    const loadingAuthors = ref(false);
    const loadingSubjects = ref(false);

    // Regra simples para validar arrays obrigatórios (ajuste se quiser opcional)
    const requiredArray = (val: number[]) =>
      (Array.isArray(val) && val.length > 0) || 'Selecione pelo menos um item';

    // Serviço padrão (mesmo do grid)
    const { getAll } = defaultService();

    // Paginação para popular selects
    const authorPagination: DefaultRequest = {
      sortBy: 'name',
      descending: false,
      page: 1,
      rowsPerPage: 100,
      fields: ''
    };
    const subjectPagination: DefaultRequest = {
      sortBy: 'description',
      descending: false,
      page: 1,
      rowsPerPage: 100,
      fields: ''
    };

    const loadAuthors = async () => {
      try {
        loadingAuthors.value = true;
        const filter = ''; // ex.: 'is_active=1' se necessário
        await new Promise<void>((resolve) => {
          getAll<any>('authors', filter, authorPagination, (res) => {
            authorOptions.value = (res?.data?.data ?? []) as Array<{ id: number; name: string }>;
            resolve();
          });
        });
      } finally {
        loadingAuthors.value = false;
      }
    };

    const loadSubjects = async () => {
      try {
        loadingSubjects.value = true;
        const filter = '';
        await new Promise<void>((resolve) => {
          getAll<any>('subjects', filter, subjectPagination, (res) => {
            subjectOptions.value = (res?.data?.data ?? []) as Array<{ id: number; description: string }>;
            resolve();
          });
        });
      } finally {
        loadingSubjects.value = false;
      }
    };

    const syncFromModel = (m: any) => {
      formData.value = m || {};
      if (!Array.isArray(formData.value.authors)) formData.value.authors = [];
      if (!Array.isArray(formData.value.subjects)) formData.value.subjects = [];

      // Preenche os ids a partir do model recebido
      const aIds = (formData.value.authors || [])
        .map((a: { id: number }) => a?.id)
        .filter((v: any) => v != null);
      const sIds = (formData.value.subjects || [])
        .map((s: { id: number }) => s?.id)
        .filter((v: any) => v != null);

      authorsIds.value = aIds;
      subjectsIds.value = sIds;

      // Garante o formato do payload logo após sincronizar
      formData.value.authors = aIds.map((id: number) => ({ id }));
      formData.value.subjects = sIds.map((id: number) => ({ id }));
    };

    // Observa apenas troca de referência do model (sem deep) e evita loop
    watch(
      model,
      (nv, ov) => {
        if (nv === ov) return;
        syncFromModel(nv);
      },
      { immediate: true }
    );

    onMounted(async () => {
      // Garante chaves no formData para o payload
      if (!Array.isArray(formData.value.authors)) formData.value.authors = [];
      if (!Array.isArray(formData.value.subjects)) formData.value.subjects = [];

      // Preenche ids para edição, se houver
      authorsIds.value = (formData.value.authors || []).map((a: { id: number }) => a.id);
      subjectsIds.value = (formData.value.subjects || []).map((s: { id: number }) => s.id);

      await Promise.all([loadAuthors(), loadSubjects()]);
    });

    // Mantém o formData no formato do payload
    watch(
      authorsIds,
      (ids) => {
        formData.value.authors = (ids || []).map((id: number) => ({ id }));
      },
      { immediate: true }
    );

    watch(
      subjectsIds,
      (ids) => {
        formData.value.subjects = (ids || []).map((id: number) => ({ id }));
      },
      { immediate: true }
    );

    return {
      formStore,
      formData,
      requiredField,
      // selects
      authorOptions,
      subjectOptions,
      authorsIds,
      subjectsIds,
      loadingAuthors,
      loadingSubjects,
      requiredArray
    };
  }
};
</script>