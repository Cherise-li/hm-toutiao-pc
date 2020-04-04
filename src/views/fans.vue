<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in list"
              :key="item.id.toString()"
            >
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{ item.name }}</p>
              <el-button type="primary" plain size="mini">+关注</el-button>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="count"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">
          <div ref="main" style="width:700px;height:500px">
            echarts图表
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "fans",
  created() {
    this.getData();
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    async getEchart() {
      const myChart = echarts.init(this.$refs.main);
      const option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: []
          }
        ]
      };
      //在配置之前发送请求,获取后台数据
      const {
        data: { data }
      } = await this.$http.get("statistics/followers");
      console.log(data);
      for (let key in data.age) {
        option.xAxis[0].data.push(
          key.replace("le", "小于").replace("gt", "大于") + "岁"
        );
        option.series[0].data.push(data.age[key]);
      }

      myChart.setOption(option);
    },
    async getData() {
      try {
        const {
          data: { data }
        } = await this.$http.get("followers", {
          params: this.reqParams
        });
        this.count = data.total_count;
        this.list = data.results;
      } catch (e) {
        this.$message.error("获取粉丝列表失败!");
      }
    },
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getData();
    }
  },
  data() {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      list: [],
      activeName: "img",
      count: 0
    };
  }
};
</script>

<style scoped lang="less">
.img_list {
  .img_item {
    text-align: center;
    display: inline-block;
    width: 120px;
    height: 170px;
    padding-top: 10px;
    margin: 0 50px 20px 0;
    border: 1px dashed #dddddd;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
