<template>
  <div>
    <div class="q-pa-md form-div" style="max-width: 400px">
      <q-form
        class="q-gutter-md"
        id="form"
        @submit.prevent="onSubmit"
        method="post"
        enctype="multipart/form-data"
      >
        <q-input
          filled
          v-model="title"
          square
          outlined
          label="Title"
          hint="Some title here"
          lazy-rules
          name="title"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          v-model="description"
          filled
          square
          outlined
          autogrow
          label="Description"
          hint="Some description here"
          name="description"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-file
          color="dark-12"
          v-model="image"
          label="Choose an image for your post"
          counter
          name="file"
          max-files="1"
          style="max-width: 365px"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-select
          square
          outlined
          name="category"
          v-model="category"
          :options="categories"
          :option-value="
            (opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)
          "
          :option-label="
            (opt) =>
              Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'
          "
          label="Select a country"
        />
        <q-select
          square
          outlined
          name="subcategory"
          v-model="subcategory"
          :options="subcategories"
          :option-value="
            (opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)
          "
          :option-label="
            (opt) =>
              (Object(opt) === opt && 'name' in opt ? opt.name : '')
          "
          label="Select a city"
        />
        <div>
          <q-btn label="Сreate new post" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      title: null,
      description: null,
      image: null,
      category: null,
      subcategory: null,
      user_id: 1,
      categories: [],
      subcategories: [],
    };
  },
  methods: {
    onSubmit() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category_id", this.category.id);
      formData.append("subCategory_id", this.subcategory.id);
      formData.append("user_id", this.user_id);
      formData.append("likes", 0);
      formData.append("file", this.image);
      formData.append("path", formData.getAll("file")[0].name);
      console.log(formData.getAll("path")[0]);
      axios({
        method: "post",
        url: "http://localhost:8080/posts/add",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  beforeMount() {
    let categories = this.$store.state.categories;
    let subcategories = this.$store.state.subcategories;
    let subcatNames = [];
    let catNames = [];
    categories.forEach((e) => {
      catNames.push(e);
    });
    subcategories.forEach((e) => {
      subcatNames.push(e);
    });
    this.categories = catNames;
    this.subcategories = subcatNames;
    console.log(this.categories);
  },
};
</script>

<style scoped>
.form-div {
  margin: auto;
}
</style>