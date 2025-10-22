<template>
  <div id="loading" v-if="loading.loading" :class="$style.loadingOverlay">
    <div :class="$style.spinner"></div>
  </div>
</template>
<script lang="ts" setup>
  import {useLoading} from '@app/composables/loading';
  const loading = useLoading();
</script>
<style lang="scss" module>
  .loadingOverlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .spinner {
      width: 50px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 8px solid #0000;
      border-right-color: #f0c300;
      position: relative;
      animation: spinLoader 1s infinite linear;
      &:before {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        border: inherit;
        animation: inherit;
        animation-duration: 2s;
      }
      &:after {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        border: inherit;
        animation: inherit;
        animation-duration: 2s;
        animation-duration: 4s;
      }
    }
  }
  @keyframes spinLoader {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
