<script setup>
import { ref } from 'vue'

const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}

const distanceOne = ref({
  traveledDistance: 60,
  verticalToTraveledDistance: 20,
})

const distanceTwo = ref({
  verticalToTraveledDistance: 50,
})
const dimensionalDistance = ref({
  traveledDistance: 66,
  verticalToTraveledDistance: 25,
})
</script>

<template>
  <div class="grid">
    <div class="show-box">
      <MControlPanel v-model="distanceOne" />
      <div class="position">
        X:<span>{{ distanceOne.traveledDistance }}</span>
        Y:<span>{{ distanceOne.verticalToTraveledDistance }}</span>
      </div>
    </div>
    <div class="show-box">
      <MControlPanel v-model="distanceTwo" :vertical="true" />
      <div class="position">
        Y:<span>{{ distanceTwo.verticalToTraveledDistance }}</span>
      </div>
    </div>
    <div class="show-box">
      <MControlPanel v-model="dimensionalDistance" :background-style="backgroundStyle" :dimensional-movement="true" />
      <div class="position">
        X:<span>{{ dimensionalDistance.traveledDistance }}</span>
        Y:<span>{{ dimensionalDistance.verticalToTraveledDistance }}</span>
      </div>
    </div>
    <div class="show-box">
      <MControlPanel v-model="dimensionalDistance" :background-style="backgroundStyle" :dimensional-movement="true" />
      <div class="position">
        X:<span>{{ dimensionalDistance.traveledDistance }}</span>
        Y:<span>{{ dimensionalDistance.verticalToTraveledDistance }}</span>
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
