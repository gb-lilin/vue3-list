<!--
 * @Author: 1973897583@qq.com 1973897583@qq.com
 * @Date: 2023-04-04 22:32:52
 * @LastEditors: 1973897583@qq.com 1973897583@qq.com
 * @LastEditTime: 2023-04-04 22:38:32
 * @FilePath: \vue3-test\vue3-list\src\components\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


<script setup>
const state = reactive({
  list: [{ background: "rgb(233,32,38)" }]
})

const data = reactive({
  isLoading: false,
  loadedCount: 1
})

const listContainer = ref()

onMounted(() => {
  getList(10);
  window.addEventListener("scroll", handleScroll());
})
const getList = async (num) => {
  data.isLoading = true;
  const delay = Math.random() * 5000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const newList = Array.from({ length: num }, () => ({ background: getRandomColor() }));
  state.list = [...state.list, ...newList];
  data.isLoading = false;
}
function handleScroll () {
  const listContainerValue = listContainer.value;
  const scrollTop = listContainerValue.scrollTop;
  const scrollHeight = listContainerValue.scrollHeight;
  const clientHeight = listContainerValue.clientHeight;
  const isBottom = scrollTop + clientHeight >= scrollHeight / 2;

  if (isBottom && data.loadedCount < 50) {
    getList(10);
    data.loadedCount += 10;
  }
}
function getRandomColor () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll());
})

</script>

<template>
  <div class="list-container" ref="listContainer">
    <div v-for="(item, index) in state.list" :key="index" class="list-item" :style="{ backgroundColor: item.background }">
      {{ index }}
    </div>
    <div class="loading" v-if="data.isLoading">Loading...</div>
  </div>
</template>

<style scoped>
.list-container {
  height: 100%;
  overflow-y: auto;
}

.list-item {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
}

.loading {
  text-align: center;
  margin: 20px 0;
}
</style>