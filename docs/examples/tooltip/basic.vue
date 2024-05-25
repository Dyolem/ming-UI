<script setup lang="ts">

</script>

<template>
  <div class="tooltip-base-box">
    <div class="top-box">
      <m-tooltip content="Hello!" placement="top-start" class="test box-item">
        <m-button>button</m-button>
      </m-tooltip>
      <m-tooltip content="Hello!" placement="top" class="test box-item">
        <m-button>button</m-button>
      </m-tooltip>
      <m-tooltip content="Hello!" placement="top-end" class="test">
        <m-button>button</m-button>
      </m-tooltip>
    </div>
    <div class="side-box">
      <div class="left">
        <m-tooltip content="Hello!" placement="left-start" class="test box-item">
          <m-button>button</m-button>
        </m-tooltip>
        <m-tooltip content="Hello!" placement="left" class="test">
          <m-button>button</m-button>
        </m-tooltip>
        <m-tooltip content="Hello!" placement="left-end" class="test">
          <m-button>button</m-button>
        </m-tooltip>
      </div>
      <div class="right">
        <m-tooltip content="Hello!" placement="right-start" class="test box-item">
          <m-button>button</m-button>
        </m-tooltip>
        <m-tooltip content="Hello!" placement="right" class="test">
          <m-button>button</m-button>
        </m-tooltip>
        <m-tooltip content="Hello!" placement="right-end" class="test">
          <m-button>button</m-button>
        </m-tooltip>
      </div>
    </div>
    <div class="bottom-box">
      <m-tooltip content="Hello!" placement="bottom-start" class="test box-item">
        <m-button>button</m-button>
      </m-tooltip>
      <m-tooltip content="Hello!" placement="bottom" class="test">
        <m-button>button</m-button>
      </m-tooltip>
      <m-tooltip content="Hello!" placement="bottom-end" class="test">
        <m-button>button</m-button>
      </m-tooltip>
    </div>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  background-color: antiquewhite;
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.top-box,.bottom-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.side-box {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.side-box>div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
