<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

//获取当前路由对象
const route = useRoute();
const editUser = ref({
  editKey:route.query.editKey,
  editName:route.query.editName,
  currentValue:route.query.currentValue,
});

//获取全局路由对象
const router = useRouter();

//提交修改个人信息的表单
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    showFailToast('用户未登录')
    return;
  }
  //todo 将editKey editName currentValue传到后台
  const res = await myAxios.post('/user/update',{
    'id':currentUser.id,
    [editUser.value.editKey as string]:editUser.value.currentValue,
  })
  if(res.code === 0 && res.data > 0){
    showSuccessToast('修改成功');
    router.back();
  }else {
    showFailToast("修改失败")
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>