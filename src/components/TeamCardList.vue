<script setup lang="ts">
  import {TeamStatusEnum} from "../constants/team";
  import ikun from "../assets/ikun1.png"
  import TeamType from "../model/team";
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast, showSuccessToast} from "vant";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user.ts";
  import {useRouter} from "vue-router";
  interface TeamCardListProps {
    teamList:TeamType[]; 
  }
  const props = withDefaults(defineProps<TeamCardListProps>(),{
    //@ts-ignore
    teamList:[] as TeamType[],
  });
  const router = useRouter();
  /**
   * 加入队伍
   */
  const doJoinTeam = async (id:number) =>{
    const res = await myAxios.post('/team/join',{
      teamId:id
    })
    if(res?.code === 0){
      showSuccessToast("加入队伍成功");

    }else {
      showFailToast('加入队伍失败' + (res.description ? ` , ${res.description}` : ''));
    }
  }
  /**
   * 获取当前登录用户
   */
  const currentUser = ref();
  onMounted(async () => {
    currentUser.value = await getCurrentUser();
  })
  /**
   * 跳转至更新队伍页
   * @param id
   */
  const doUpdateTeam = (id:number) =>{
    router.push({
      path:'/team/update',
      query:{
        id,
      }
    })
  }
  /**
   * 退出队伍
   * @param id
   */
  const doQuitTeam = async (id:number) =>{
    const res = await myAxios.post('/team/quit',{
      teamId:id
    })
    if(res?.code === 0){
      showSuccessToast("退出队伍成功");

    }else {
      showFailToast('退出队伍失败' + (res.description ? ` , ${res.description}` : ''));
    }
  }
  /**
   * 解散队伍
   * @param id
   */
  const doDeleteTeam = async (id:number) =>{
    const res = await myAxios.post('/team/delete',{
      id,
    })
    if(res?.code === 0){
      showSuccessToast("解散队伍成功");

    }else {
      showFailToast('解散队伍失败' + (res.description ? ` , ${res.description}` : ''));
    }
  }
</script>

<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              :title="`${team.name}`"
              :desc=team.description
              :thumb="ikun"
    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px;margin-top: 8px">
          {{TeamStatusEnum[team.status]}}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{'最大人数:' + team.maxNum}}
        </div>
        <div v-if="team.expireTime">
          {{'过期时间:' + $filters.formatTime(team.expireTime)}}
        </div>
        <div v-if="team.createTime">
          {{'创建时间:' + $filters.formatTime(team.createTime)}}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    size="mini" type="primary"
                    plain
                    @click="doJoinTeam(team.id)">
                    加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin"
                    size="mini"
                    plain
                    @click="doQuitTeam(team.id)">
                    退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id"
                    size="mini"
                    plain
                    type="danger"
                    @click="doDeleteTeam(team.id)">
                    解散队伍
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<style scoped>
  #teamCardList :deep(.van-image__img){
    object-fit: cover;
    height: 128px;
  }
</style>