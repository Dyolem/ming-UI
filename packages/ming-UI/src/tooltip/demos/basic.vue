<script setup lang="ts">

</script>

<template>
  <div class="show-box">
    <m-tooltip content="Hello!" placement="top" effect="dark" class="test">
      <m-button>111</m-button>
      <template #content>
        <span>world</span>
      </template>
    </m-tooltip>
    <m-tooltip content="Hello!" placement="top" class="test">
      <m-button>111</m-button>
      <template #content>
        <span>world</span>
      </template>
    </m-tooltip>
    <m-tooltip content="Hello!" placement="top" effect="customized" class="test">
      <m-button>111</m-button>
      <template #content>
        <span>world</span>
      </template>
    </m-tooltip>
    <m-tooltip content="Hello!" placement="top" effect="fullCustomized" class="test">
      <m-button>111</m-button>
      <template #content>
        <span>world</span>
      </template>
    </m-tooltip>
  </div>
</template>

<style>
.test {
  background: linear-gradient(180deg, rgb(53, 158, 122),rgb(53, 109, 158))
}
</style>
