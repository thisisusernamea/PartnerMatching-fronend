<script setup lang="ts">
  import {useRoute} from "vue-router";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.ts"
  import {showFailToast, showSuccessToast} from "vant";
  import qs from 'qs';
  import UserCardList from "../components/UserCardList.vue";

  const route = useRoute();
  const {tags} = route.query;
  const userList = ref([]);
  onMounted(async () => {
   const userListData = await myAxios.get('/user/search/tags', {
      params: {
        tagNameList : tags
      },
      /*参数序列化*/
      paramsSerializer:params => {
        return qs.stringify(params,{indices:false})
      }
    })
      .then(function (response) {
        console.log("/user/search/tags success",response);
        showSuccessToast('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.log("/user/search/tags error",error);
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
  <!-- 搜索结果(用户信息列表) -->
  <user-card-list :user-list="userList"></user-card-list>
  <!-- 搜索为空的搜索提示-->
  <van-empty v-if="!userList || userList.length<1" image="search" description="搜索结果为空" />
</template>

<style scoped>

</style>