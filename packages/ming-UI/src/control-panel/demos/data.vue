<script setup>
import { ref } from 'vue'

const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}

const positionOne = ref({
  horizontalDistanceRatio: 60,
  verticalDistanceRatio: 20,
})

const positionTwo = ref({
  verticalDistanceRatio: 50,
})
const dimensionalPosition = ref({
  horizontalDistanceRatio: 66,
  verticalDistanceRatio: 25,
})
</script>

<template>
  <div class="grid">
    <div class="show-box">
      <MControlPanel v-model="positionOne" />
      <div class="position">
        X:<span>{{ positionOne.horizontalDistanceRatio }}</span>
        Y:<span>{{ positionOne.verticalDistanceRatio }}</span>
      </div>
    </div>
    <div class="show-box">
      <MControlPanel v-model="positionTwo" :vertical="true" />
      <div class="position">
        Y:<span>{{ positionTwo.verticalDistanceRatio }}</span>
      </div>
    </div>
    <div class="show-box">
      <MControlPanel v-model="dimensionalPosition" :background-style="backgroundStyle" :dimensional-movement="true" />
      <div class="position">
        X:<span>{{ dimensionalPosition.horizontalDistanceRatio }}</span>
        Y:<span>{{ dimensionalPosition.verticalDistanceRatio }}</span>
      </div>
    </div>
    <div class="show-box">
      <MControlPanel v-model="dimensionalPosition" :background-style="backgroundStyle" :dimensional-movement="true" />
      <div class="position">
        X:<span>{{ dimensionalPosition.horizontalDistanceRatio }}</span>
        Y:<span>{{ dimensionalPosition.verticalDistanceRatio }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .grid {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .public {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .show-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
  }
</style>
