<template>
  <div class="show-box">
    <m-tooltip content="hello!">
      <m-button>button</m-button>
    </m-tooltip>
    <m-tooltip content="hello!" effect="light">
      <m-button>button</m-button>
    </m-tooltip>
    <m-tooltip content="Hello!" effect="customized" class="test">
      <m-button>button</m-button>
    </m-tooltip>
    <m-tooltip content="Hello!" effect="fullCustomized" class="test">
      <m-button>button</m-button>
    </m-tooltip>
  </div>
</template>

<style scoped>
:deep(.test) {
  background: linear-gradient(180deg, rgb(53, 158, 122),rgb(53, 109, 158))
}
</style>
