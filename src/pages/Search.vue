<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";

/*展示、移除标签*/
const show = ref(true);
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })
}

const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
      { text: '宁波', id: 3, disabled: true },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: '南京aaaaaaaa' },
      { text: '无锡', id: '无锡bbbbbbbb' },
      { text: '徐州', id: '徐州cccccccc' },
    ],
  },
]
let tagList = ref(originTagList);

/*搜索标签过滤*/
const searchText = ref('');
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag =>{
    const tempParentTag = {...parentTag};
    const tempChildren = [...parentTag.children];
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
}

/**
 * 点击搜索按钮触发事件
 */
const router = useRouter();
const doSearchResult =() => {
  router.push({
    path:'user/list',
    query:{
      tags:activeIds.value
    }
  })
}
</script>

<template>
  <!-- 搜索框 -->
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <!-- 已选标签 -->
  <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <!-- 已选标签展示 -->
    <!--<van-row :gutter="[20, 20]" style="padding: 0 16px">
              <van-col v-for="tag in activeIds">
                <van-tag :show="show" closeable size="medium" type="primary" @close="doClose(tag)">
                  {{ tag }}
                </van-tag>
              </van-col>
    </van-row>-->
    <van-space :size="16" wrap>
      <van-tag :show="show" v-for="tag in activeIds" closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-space>

  <!-- 选择标签 -->
  <van-divider content-position="left">选择标签</van-divider>
    <!-- 标签分类选择器 -->
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />

  <!-- 搜索按钮 -->
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<style scoped>

</style>