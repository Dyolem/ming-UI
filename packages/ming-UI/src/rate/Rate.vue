<script setup lang="ts">
defineOptions({
  name: 'MRate',
})
</script>

<template>
  <div class="container">
    <svg width="100%" height="100%" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z"
        fill="url(#half-gradient)" stroke="#333" stroke-width="3" stroke-linejoin="round"
      />
      <defs>
        <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="70%" stop-color="gold" />
          <stop offset="30%" stop-color="transparent" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.container {
    width: 20px;
    height: 20px;
    /* background-color: pink; */
    /* mask-image: url(./star.svg); */
    /* mask-repeat: no-repeat; */
    /* mask-size: 100% 100%; */
}
</style>
