<template>
  <div>
    <teleport to="#modal">
      <div class="box">hahahahha</div>
    </teleport>
  </div>
</template>

<script lang="ts">
// teleport 独立组件，可将组件挂载到对应的节点下
export default {
}
</script>

<style scoped>
.box {
    width:300px;
    height: 300px;
    border: 1px solid #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
