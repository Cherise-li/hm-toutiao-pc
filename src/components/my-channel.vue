<template>
  <el-select @change="kongChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  data() {
    return {
      options: []
    }
  },
  props: ['value'],
  created() {
    this.getChannels()
  },
  methods: {
    kongChannel(value) {
      if (value === '') {
        value = null
      }
      this.$emit('input', value)
    },
    async getChannels() {
      try {
        const {
          data: { data }
        } = await this.$http.get('channels')
        this.options = data.channels
      } catch (e) {
        this.$message.error('获取文章频道失败!')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>