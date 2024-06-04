<template>
  <div class="card p-fluid">
    <DataTable
      v-model:filters="filters"
      :value="customers"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      filterDisplay="row"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            class: [{ 'pt-0 pb-0': state['d_editing'] }],
          }),
        },
      }"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        style="width: 25%"
        sortable
        filter
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            v-tooltip.top.focus="'Нажмите клавишу ввода, чтобы отфильтровать'"
            type="text"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const customers = ref();
const columns = ref([
  { field: 'user_id', header: 'ID' },
  { field: 'user_name', header: 'ФИО' },
  { field: 'user_login', header: 'Логин' },
  { field: 'user_email', header: 'Электронная почта' },
  { field: 'proj_count', header: 'Проекты' },
  { field: 'user_created', header: 'Дата создания' },
  { field: 'actions', header: 'Действия' },
]);
const filters = ref({
  user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  user_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  user_login: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  user_email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  proj_count: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  user_created: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  actions: { value: null, matchMode: FilterMatchMode.EQUALS },
});

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => {
    customers.value = getCustomers(data);
  });
});

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;

  switch (field) {
    case 'user_id':
    case 'proj_count':
      if (isPositiveInteger(newValue)) data[field] = newValue;
      else event.preventDefault();
      break;

    default:
      if (newValue.trim().length > 0) data[field] = newValue;
      else event.preventDefault();
      break;
  }
};

const formatDate = (value) => {
  return value.toLocaleDateString('ru-Ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
const clearFilter = () => {
  initFilters();
};

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.user_created = new Date(d.user_created);

    return d;
  });
};
</script>

<style>
body {
  font-family: var(--font-family);
  font-weight: normal;
  background: var(--surface-ground);
  color: var(--text-color);
  padding: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.adminTable {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

p {
  line-height: 1.75;
}

.fieldRow {
  z-index: 100;
}
.fieldTitle {
  border: none;
  padding: 0;
}
.filter {
  display: block;
  width: 100%;
  align-items: unset;
  border: none;
}

.search {
  display: block;
  width: 100%;
  align-items: unset;
  border: 1px solid #ced4da;
  border-radius: 0;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  height: 32px;
}

.search2 {
  display: block;
  width: 100%;
  align-items: unset;
  border: 1px solid #ced4da;
  border-radius: 0;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  height: 32px;
}

.head-dropdown {
  font-size: 14px;
}

::placeholder {
  color: black !important;
}

.exportBut {
  padding: 4px 16px;
  box-sizing: border-box;
  display: flex;
}
.exportBut .btn-primary {
  width: 6em;
  margin-right: 5px;
}

.exportBut .btn-secondary {
  width: 6em;
}
.header {
  height: 150px;
}

.checkbox-group1 {
  width: 100%;
  padding: 4px 16px;
  font-size: 12px;
}
</style>
