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
       v-model="formData.name"
       label="Nome"
       outlined
       clearable
       :disable="formStore.isDisable"
       :readonly="formStore.isDisable"
    />
</template>
<script setup lang="ts">
  import { useFormStore } from 'stores/form';
  import { defineProps, ref, toRefs } from 'vue';

  const props = defineProps(['model']);

  const { model } = toRefs(props);
  const formData = ref(model.value);
  const formStore = useFormStore();
</script>
