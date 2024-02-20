<script setup lang="ts">
  import {useRouter} from "vue-router";
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
/*  const createTime = new Date(user.value.createTime);
  console.log(createTime);*/
  /*修改个人信息*/
  const router = useRouter();
  const doEdit =(editKey : string,editName : string,currentValue : string) =>{
    router.push({
      path:'/user/edit',
      query:{
        editKey,
        editName,
        currentValue,
      }
    });
  }

</script>

<template>
  <template v-if="user">
    <van-cell title="修改个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="姓名" is-link to="/user/edit" :value="user.username" @click="doEdit('username','姓名',user.username)"/>
    <van-cell title="账户" is-link to="/user/edit" :value="user.userAccount" @click="doEdit('userAccount','账户',user.userAccount)"/>
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell title="性别" is-link :value="user.gender" @click="doEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="doEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="doEdit('email','邮箱',user.email)"/>
    <van-cell title="头像" is-link  to="/user/edit" >
      <img style="height: 48px" :src="user.avatarUrl" >
    </van-cell>
    <van-cell title="注册时间" :value="$filters.formatTime(user.createTime)"/>
  </template>
</template>

<style scoped>

</style>