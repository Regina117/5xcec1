<template>
<div class="adminTable">
  <b-navbar class="addUserPanel">
    <div class="col-12 col-md-3 text1">Пользователи</div>
    <div class="col-12 col-md-7"></div>
    <div class="col-6 col-md-2 d-flex justify-content-end">
      <b-button variant="primary" size="sm" @click="showAddUserModal"
        >Новый пользователь</b-button
      >
    </div>
  </b-navbar>
  <div class="adminTable">
    <DataTable
      v-model:filters="filters"
      :value="customers"
      paginator
      showGridlines
      :rows="10"
      dataKey="user_id"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="[
        'user_id',
        'user_name',
        'user_login',
        'user_email',
        'proj_count',
        'actions',
      ]"
    >
      <template #header>
        <div class="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Очистить"
            outlined
            @click="clearFilter()"
          />
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="Поиск"
            />
          </IconField>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column field="user_id" header="ID" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.user_id }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по ID"
          />
        </template>
      </Column>

      <Column field="user_name" header="ФИО" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.user_name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по имени"
          />
        </template>
      </Column>

      <Column field="user_login" header="Логин" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.user_login }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по логину"
          />
        </template>
      </Column>

      <Column
        field="user_email"
        header="Электронная почта"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.user_email }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по email"
          />
        </template>
      </Column>

      <Column field="proj_count" header="Проекты" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.proj_count }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по проекту"
          />
        </template>
      </Column>

      <Column
        header="Дата создания"
        filterField="user_created"
        dataType="date"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ formatDate(data.user_created) }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            mask="99/99/9999"
          />
        </template>
      </Column>

      <Column
        field="actions"
        header="Действия"
        dataType="boolean"
        bodyClass="text-center"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500 ': data.verified,
              'pi-times-circle text-red-500': !data.verified,
            }"
          ></i>
        </template>
        <template #filter="{ filterModel }">
          <label for="verified-filter" class="font-bold"> Действия </label>
          <TriStateCheckbox
            v-model="filterModel.value"
            inputId="verified-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const customers = ref();
const filters = ref();
const loading = ref(true);

onMounted(() => {
CustomerService.getCustomersMedium().then((data) => {
  customers.value = getCustomers(data);
  loading.value = false;
});
});

const initFilters = () => {
filters.value = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  user_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.IN }],
  },
  user_name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  user_login: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  proj_count: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  actions: { value: null, matchMode: FilterMatchMode.EQUALS },
};
};

initFilters();

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
const getSeverity = (status) => {
switch (status) {
  case 'unqualified':
    return 'danger';

  case 'qualified':
    return 'success';

  case 'new':
    return 'info';

  case 'negotiation':
    return 'warning';

  case 'renewal':
    return null;
}
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
