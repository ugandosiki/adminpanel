<template>
  <div class="q-pa-md">
    <q-table
      title="Categories"
      dense
      :data="this.$store.state.categories"
      :columns="columns"
      row-key="name"
    />
    
  </div>
</template>

<script>
export default {
  name: "RoleComponent",
  data() {
    return {
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
          headerClasses: "bg-dark text-white ",
        },
        {
          name: "name",
          required: true,
          label: "NAME",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
          headerClasses: "bg-dark text-white ",
        },
      ],
    };
  },
};
</script>

<style>
</style>