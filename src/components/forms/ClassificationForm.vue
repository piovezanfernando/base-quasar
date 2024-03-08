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
    :rules="[(val: string) => requiredField(val)]"
  />
</template>
<script setup lang="ts">
import { useFormStore } from 'stores/form';
import { defineProps, ref, toRefs } from 'vue';
import { required } from 'src/utils/validations';

const props = defineProps(['model', 'fields']);

const { model } = toRefs(props);
const formData = ref(model.value);
const requiredField = required;
const formStore = useFormStore();

</script>
