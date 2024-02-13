<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts"
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);
onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend', {
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
  if(userListData){
    userListData.forEach(user =>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
});
</script>

<template>
  <!-- 默认推荐展示(用户信息列表) -->
  <user-card-list :user-list="userList"></user-card-list>
  <!-- 推荐为空的提示-->
  <van-empty v-if="!userList || userList.length<1" image="search" description="数据为空" />
</template>

<style scoped>

</style>