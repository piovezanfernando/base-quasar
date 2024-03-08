<template>
  <q-expansion-item icon="topic" label="Informações" class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-6">
            <q-input
              v-model="formData.created_at"
              label="Criado em:"
              disable
              borderless
              readonly
            />
            <q-input
              v-model="formData.updated_at"
              label="Atualizado em:"
              disable
              borderless
              readonly
            />
            <q-input
              v-model="formData.deleted_at"
              label="Excluído por:"
              disable
              borderless
              readonly
              v-if="formData.deleted_at"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="formData.created_by"
              label="Criado por:"
              disable
              borderless
              readonly
            />
            <q-input
              v-model="formData.updated_by"
              label="Atualizado por:"
              disable
              borderless
              readonly
            />
            <q-input
              v-model="formData.deleted_by"
              label="Excluído por:"
              disable
              borderless
              readonly
              v-if="formData.deleted_at"
            />
          </div>

        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  name: 'information-expanse',
  props: ['model'],
  setup (props) {
    const formData = ref(props.model);

    watch(() => props.model, (newModel) => {
      formData.value = newModel;
    });

    return {
      formData
    };
  }
};

</script>