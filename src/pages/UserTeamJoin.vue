<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.ts";
  import TeamCardList from "../components/TeamCardList.vue";
  import {showFailToast, showToast} from "vant";

  const searchText = ref('');
  const router = useRouter();

  const teamList = ref([]);
  /**
   * 搜索队伍
   * @param val
   */
  const listTeam = async (val='') =>{
    const res = await myAxios.get('/team/list/my/join',{
      params:{
        searchText:val,
        pageNum:1,
      }
    });
    if(res?.code === 0){
      teamList.value = res.data;
    }else {
      showFailToast("加载队伍失败,请刷新重试");
    }
  }
  //页面加载时指触发一次
  onMounted( () =>{
    listTeam();
  })
  //搜索队伍事件
  const onSearch = (val) => {
    listTeam(val);
  };
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :team-list="teamList"/>
    <!-- 推荐为空的提示-->
    <van-empty v-if="teamList?.length<1" image="search" description="数据为空" />
  </div>

</template>

<style scoped>

</style>