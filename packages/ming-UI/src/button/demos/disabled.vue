<docs>
---
title:按钮禁用
---

设置`disabled`为`true`即可禁用按钮
</docs>

<script setup lang="ts">

</script>

<template>
  <div class="show-box">
    <m-button type="dashed" :disabled="false">
      按钮
    </m-button>
    <m-button type="primary" disabled>
      按钮
    </m-button>
  </div>
</template>

    <style>
    .show-box{
      display: flex;
    }
    </style>
