<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              Visualização de registro
            </div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" flat icon="more_vert">
              <q-menu anchor="bottom left" self="top left" auto-close>
                <q-list>
                  <q-item clickable @click="showConfirmMessage = true">
                    <q-item-section v-if="showEditBtn">Excluir</q-item-section>
                    <q-item-section v-if="!showEditBtn">Reativar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn color="grey-7" flat icon="close" @click="closeSideBar" />
          </div>
        </div>
      </q-card-section>
      <q-form class="q-gutter-md" @submit.prevent="onSubmit()">
        <q-expansion-item icon="topic" label="Detalhes" default-opened class="q-pa-md">
          <q-card>

            <q-card-section>
              <component :is="component" :model="formData"></component>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <div>
          <q-btn label="Editar" v-if="showEditBtn" flat text-color="white" class="q-ml-md bg-blue-7"
                 @click="setEdit();" />
          <div v-if='!formStore.isDisable'>
            <q-btn label="Cancelar" @click="btnCancel()" flat text-color="grey-8" class="q-mr-sm q-ml-md bg-grey-3" />
            <q-btn label="Salvar" type="submit" flat text-color="white" class="q-mr-sm q-my-lg bg-blue-7"
                   validateBeforeSubmit: true />
          </div>
        </div>
      </q-form>
      <information-expanse :model="formData"></information-expanse>
    </q-card>
    <q-dialog v-model="showConfirmMessage" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="report" color="orange" size="xl" text-color="white" />
          <span class="q-ml-sm">Deseja realmente excluir este registro?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Sim"
            color="red"
            v-close-popup
            @click="requestDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import defaultService from 'src/api/default';
import { useFormStore } from 'stores/form';
import { computed, onMounted, ref, toRefs } from 'vue';
import InformationExpanse from 'components/forms/informationExpanse.vue';
import SubjectForm from 'components/forms/SubjectForm.vue';
import AuthorForm from 'components/forms/AuthorForm.vue';
import BookForm from 'components/forms/BookForm.vue';
export default {
  name: 'defaultForm',
  components: { InformationExpanse, SubjectForm, AuthorForm, BookForm },
  props: ['model', 'isEdit', 'routeApi', 'component'],
  setup(props) {
    let formData = toRefs(props.model);
    onMounted(() => {
      formData.value = props.model;
    });
    const formStore = useFormStore();
    const { update, create, remove } = defaultService();
    const showConfirmMessage = ref(false);
    const showEditBtn = computed(() => formStore.isDisable && formData?.is_active);

    const closeSideBar = () => {
      formStore.setIsVisible(false);
    };

    const setEdit = () => {
      formStore.setIsDisable(false);
    };

    const btnCancel = () => {
      formStore.setIsDisable(true);
    };

    const handleApi = () => {
      if (formData.value !== null && formData.value['id'] != undefined) {
        update(
          props.routeApi,
          formData.value['id'],
          formData.value,
          (response) => {
            console.log('fernando', JSON.stringify(response));
            if (response.success) {
              formStore.setIsDisable(true);
              formStore.setIsRefresh(true);
            }
          }
        );
      } else {
        console.log(formData);
        create(
          props.routeApi,
          formData,
          (response) => {
            if (response.success) {
              formStore.setIsDisable(true);
              formStore.setIsRefresh(true);
            }
          });
      }
      closeSideBar();
    };

    const onSubmit = () => {
      handleApi();
    };

    const requestDelete = () => {
      remove(
        props.routeApi,
        formData.value['id'],
        (response) => {
          if (response.success) {
            formStore.setIsDisable(true);
            formStore.setIsRefresh(true);
            formStore.setIsVisible(false);
          }
        });
    };

    return {
      showConfirmMessage,
      formStore,
      formData,
      update,
      create,
      remove,
      showEditBtn,
      closeSideBar,
      setEdit,
      btnCancel,
      onSubmit,
      requestDelete
    };
  }
};
</script>
