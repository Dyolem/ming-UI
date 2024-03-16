<template>
  <div class="show-box">
    <m-tooltip content="hello">
      <m-button>button</m-button>
      <template #content>
        <span>world</span>
      </template>
    </m-tooltip>
  </div>
</template>
