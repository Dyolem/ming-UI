<script setup lang="ts">

</script>

<template>
  <div class="show-box">
    <m-tooltip content="Hello!" placement="top">
      <span>111</span>
      <template #content>
        <span style="color: red;">world</span>
      </template>
    </m-tooltip>
  </div>
</template>
