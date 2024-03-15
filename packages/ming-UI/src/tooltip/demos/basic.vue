<script setup lang="ts">

</script>

<template>
  <div class="show-box">
    <m-tooltip content="Hello!" placement="top">
      <m-button>111</m-button>
      <template #content>
        <span>world</span>
      </template>
    </m-tooltip>
  </div>
</template>
