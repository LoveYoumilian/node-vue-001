<template>
  <div class="about">
    <h1>categoryList</h1>
    <el-main>
      <el-table :data="list">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="icon" label="分类图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="height:3rem" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/items/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="primary" size="small" @click="deletes(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async fetch() {
      let res = await this.$http.get("rest/items");
      this.list = res.data;
    },
    deletes(row) {
      this.$confirm(`是否确定要删除${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.delete(`rest/items/${row._id}`);
          if (res) {
            this.$message({
              sucess: true,
              message: "删除成功了!"
            });
            this.fetch();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
