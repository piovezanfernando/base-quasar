<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5 text-center"> Busca de {{ gridName }}</div>
    </q-card-section>
    <q-card-section>
      <q-chip v-for="(chip, index) in chipsWithLabels" :key="index" removable @remove="removeFilter(index)"
        color="green" text-color="white" icon="search" :label="chip['label']" />
      <div class="row q-pt-md">
        <q-select v-model="selectedFields.field" :options="fieldOptions" label="Campo" map-options class="col-3" />
        <q-space></q-space>
        <q-select v-if="selectedFields.field != ''" v-model="selectedFields.operator" :options="operatorOptions"
          label="operator" emit-value map-options class="col-3">
          <template v-slot:option="props">
            <q-item v-if="props['opt'].category.includes(selectedFields.field['type'])" v-bind="props['itemProps']">
              <q-item-section>
                <q-item-label>{{ props['opt'].label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-space />
        <component :is="getFieldComponent()" v-model="selectedFields.value" class="col-3"
          :model-date="selectedFields.value" @update:model-date="onDateChange" />
      </div>
      <div class="row q-pt-md">
        <div class="col-auto">
          <q-btn v-if="selectedFields.value != ''" @click="addField" color="primary" label="Adicionar Filtro"
            class="q-my-lg" />
        </div>
        <div class="col"></div>
        <div class="col-auto">
          <q-btn v-if="chipsWithLabels?.length > 0" label="Limpar" text-color="white" @click="clearSearch"
            class="q-my-lg bg-amber-7" />
          <q-btn v-if="chipsWithLabels?.length > 0" color="primary" label="Buscar" text-color="white"
            @click="execSearch" class="q-my-lg bg-green-7" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QBtn, QInput, QSelect, QToggle } from 'quasar';
import DateInput from 'components/generic/DateInput.vue';
import DateInputRange from 'components/generic/DateInputRange.vue';
import { useFilterStore } from 'stores/filter';
const props = defineProps(['gridName', 'fields']);

const fieldOptions = props.fields;
const filterStore = useFilterStore();

const operatorOptions = [
  {
    label: 'igual',
    value: '=',
    category: 'string|number|date|boolean'
  },
  {
    label: 'maior que',
    value: '>=',
    category: 'number|date'
  },
  {
    label: 'menor que',
    value: '<=',
    category: 'number|date'
  },
  {
    label: 'entre',
    value: '<>',
    category: 'number|date'
  }

];

const onDateChange = (newDate: string) => {
  selectedFields.value.value = newDate;
};

const selectedFields = ref({
  field: '',
  operator: '',
  value: ''
});

const chips = ref<any[]>([]);

const chipsWithLabels = computed(() => {
  return chips.value.filter((chip: { label?: string }) => chip?.label);
});

const removeFilter = (index: number) => {
  chips.value.splice(index, 1);
};

const addField = () => {
  chips.value.push({
    label: selectedFields.value.field['label'],
    name: selectedFields.value.field['value'],
    operator: selectedFields.value.operator,
    value: selectedFields.value.value
  });
  clearFields();
};

const clearFields = () => {
  selectedFields.value.field = '';
  selectedFields.value.operator = '';
  selectedFields.value.value = '';
};

const getFieldComponent = () => {
  const type = selectedFields.value.field['type'];
  if (type === 'date') {
    if (selectedFields.value.operator === '<>') {
      return DateInputRange;
    }
    return DateInput;
  } else if (type === 'boolean') {
    return QToggle;
  } else if (type === 'string' || type === 'number') {
    return QInput;
  }
};

const execSearch = () => {
  let filter = '';
  for (let chipsKey in chips.value) {
    if (filter !== '') {
      filter += '&';
    }
    if (chips.value[chipsKey].operator == '=') {
      filter += chips.value[chipsKey].name +
        chips.value[chipsKey].operator +
        chips.value[chipsKey].value;
    }
    if (chips.value[chipsKey].operator == '<=' || chips.value[chipsKey].operator == '>=') {
      filter += `operator[${chips.value[chipsKey].name}]` +
        '=' +
        chips.value[chipsKey].operator;
      filter += '&';
      filter += chips.value[chipsKey].name +
        '=' +
        chips.value[chipsKey].value;
    }
    if (chips.value[chipsKey].operator == '<>') {
      filter += 'start_' + chips.value[chipsKey].name +
        '=' +
        chips.value[chipsKey].value.from;
      filter += '&';
      filter += 'end_' + chips.value[chipsKey].name +
        '=' +
        chips.value[chipsKey].value.to;
    }
  }

  filterStore.setFilterName(filter);
};

const clearSearch = () => {
  filterStore.clearFilter();
  chips.value = [];
};

</script>