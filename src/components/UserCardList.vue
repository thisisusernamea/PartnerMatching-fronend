<script setup lang="ts">
  import UserType from "../model/user";
  interface UserCardListProps {
    userList:UserType[]; /*此属性为数组类型*/
  }
  const props = withDefaults(defineProps<UserCardListProps>(),{
    //@ts-ignore
    userList:[] as UserType[], /*设置userList默认为空数组*/
  });
</script>

<template>
  <van-card v-for="user in props.userList"
            :title="`${user.username} (${user.planetCode})`"
            :desc=user.profile
            :thumb=user.avatarUrl
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>