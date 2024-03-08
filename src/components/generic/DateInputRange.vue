<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input filled :model-value="`${dateRange.from} - ${dateRange.to}`" >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateRange" @update:modelValue="emitDate" range>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">

import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps(['modelDate', 'isRange']);
const emits = defineEmits(['update:modelDate']);

const dateRange = ref({from: '', to: ''});

const emitDate = (val: string) => {
  emits('update:modelDate', val);
};

</script>