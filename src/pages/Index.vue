<script setup lang="ts">
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts"
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<boolean>(false);
const userList = ref([]);
const loading = ref(false);
/**
 * 加载数据
 */
const loadData = async () =>{
  loading.value = true;
  let userListData;
  //心动模式 -> 根据标签查询用户
  if(isMatchMode.value){
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log("/user/match success",response);
          showSuccessToast('请求成功');
          return response?.data;
        })
        .catch(function (error) {
          console.log("/user/match error",error);
          showFailToast("请求失败");
        })
    //普通模式 -> 直接分页查询用户
  }else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageNum:1,
        pageSize:8,
      },
    })
        .then(function (response) {
          console.log("/user/recommend success",response);
          showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log("/user/recommend error",error);
          showFailToast("请求失败");
        })
  }
  if(userListData){
    userListData.forEach(user =>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}
watchEffect( () =>{
  loadData();
})

</script>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <!-- 默认推荐展示(用户信息列表) -->
  <user-card-list :user-list="userList" :loading="loading"></user-card-list>
  <!-- 推荐为空的提示-->
  <van-empty v-if="!userList || userList.length<1" image="search" description="数据为空" />
</template>

<style scoped>

</style>