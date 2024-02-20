<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

/* const user = {
   id: 1,
   username: "鱼皮",
   userAccount: "dogYuPi",
   planetCode: "1",
   gender: "男",
   phone: "1223412",
   email:"12231@qq.com",
   avatarUrl:"https://q4.qlogo.cn/g?b=qq&nk=2742895138@qq.com&s=3?d=retro",
   createTime:new Date(),
 };*/

  /*获取当前用户个人信息(在当前页面首次加载时执行该钩子函数)*/
  const user = ref();
  onMounted(async () => {
    user.value = await getCurrentUser();
  })

</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username"/>
    <van-cell title="修改个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>

<style scoped>

</style>