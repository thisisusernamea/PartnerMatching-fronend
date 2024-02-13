<script setup>
import {showToast} from "vant";
import {ref} from "vue";
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
};

//const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);
</script>

<template>
  <!--导航栏-->
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <!--搜索图标插槽-->
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <!--中心部分-->
  <div id="content">
    <router-view />
  </div>

  <!-- tabbar栏-->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>



<style scoped>
  #content {
    padding-bottom: 50px;
  }
</style>