<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-select v-model="model.parent" placeholder="请选择">
        <el-option
          v-for="item in parents"
          :key="item.name"
          :label="item.name"
          :value="item._id"
        ></el-option>
      </el-select>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  methods: {
    async save() {
      try {
        let suc = "";
        console.log(this.model)
        if (this.id) {
          suc = await this.$http.put(`rest/categories/${this.id}`, this.model);
        } else {
          suc = await this.$http.post("rest/categories", this.model);
        }
        if (suc) {
          this.$router.push("/categories/list");
          this.$message({
            type: "sucess",
            message: "保存成功了"
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetch() {
      let res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents(){
      let  res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch();
  }
};
</script>