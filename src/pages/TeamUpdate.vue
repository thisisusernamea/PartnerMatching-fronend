<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

  const router = useRouter();
  const route = useRoute();
  /**
   * 获取待修改队伍的信息
   */
  const id = route.query.id;
  const updateTeamData = ref({});
  onMounted(async () => {
    if(id <= 0){
      showFailToast('更新队伍失败');
      return;
    }
    const res = await myAxios.get('/team/get',{
      params:{
        id,
      }
    });
    if(res?.code === 0){
      updateTeamData.value = res.data;
    }else {
      showFailToast('1111')
    }
  })

  /**
 * 日期选择器配置
 */
  const minDate = new Date();
  const showPicker = ref(false);
  const currentDate = ref(['2024','02','18']);//定义一个初始时间(年月日)
  const currentTime = ref(['12', '00', '00']);		//定义一个初始时间(时分秒)
  const columnsType = ['hour', 'minute', 'second'];
  const onConfirm = () =>{
    //组合过期时间,‘T’是满足后端序列化配的
    updateTeamData.value.expireTime = currentDate.value.join('-') + 'T' + currentTime.value.join(':');
    showPicker.value = false;//有了这行才会使picker点击”确认“后自动关闭
  }
  /**
 * 提交
 */
  const doSubmit = async () =>{
      const postData = {
        ...updateTeamData.value,
        status: Number(updateTeamData.value.status)
      }
      //todo 前端参数校验
      const res = await myAxios.post('/team/update',postData)
      if(res?.code === 0 && res.data){
        showSuccessToast('更新成功');
        router.push({
          path:'/team',
          replace:true,
        });
      }else {
        showFailToast('更新失败');
      }
    }
</script>

<template>
  <div id="teamAdd">
    <van-form @submit="doSubmit">
      <van-cell-group inset>
        <!-- 队伍名称输入框 -->
        <van-field
            v-model="updateTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请输入队伍名称' }]"
        />
        <!-- 高度自适应输入框 -->
        <van-field
            v-model="updateTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <!-- 日期选择器
             updateTeamData.expireTime ?? '点击选择过期时间' -> 如果expireTime存在显示真实值,不存在则显示'点击选择过期时间'
        -->
        <van-field
            is-link
            readonly
            clickable
            name="date-picker"
            label="过期时间"
            :placeholder="$filters.formatTime(updateTeamData.expireTime) || '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="设定过期日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="onConfirm"
              @cancel="showPicker = false"
          >
            <van-date-picker
                v-model="currentDate"
                :min-date="minDate"
            />
            <van-time-picker
                v-model="currentTime"
                :columns-type="columnsType"
            />
          </van-picker-group>
        </van-popup>
        <!-- 队伍状态选择单选框 -->
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 队伍密码输入框 -->
        <van-field
            v-if="Number(updateTeamData.status) === 2"
            v-model="updateTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写队伍密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>