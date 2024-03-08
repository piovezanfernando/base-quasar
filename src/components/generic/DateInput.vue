<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input filled v-model="date" mask="date" :rules="['date']" >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" @update:modelValue="emitDate">
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

import { defineEmits, defineProps, ref, toRefs } from 'vue';

const props = defineProps(['modelDate']);
const emits = defineEmits(['update:modelDate']);

const { modelDate } = toRefs(props);

const date = ref(modelDate.value);

const emitDate = (val: string) => {
  emits('update:modelDate', val);
};

</script>