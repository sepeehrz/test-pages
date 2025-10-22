<template>
  <div class="v-toast-container" :class="containerPosition">
    <transition name="fade">
      <div v-if="show">
        <div
          class="v-toast"
          :class="`v-toast-${item.type}`"
          v-for="(item, index) in toasts"
          :key="index">
          <div
            v-if="item.withClose"
            class="v-toast-icon"
            @click="closeToast(index)">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
                fill="currentColor" />
            </svg>
          </div>
          <div class="v-toast-content">
            <div class="v-toast-counter" v-if="item.withCounter">
              {{ item.counter }}
            </div>
            <div class="v-toast-message">
              {{ item.message }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    data() {
      return {
        toasts: <any>[],
        position: '',
        show: false
      };
    },
    computed: {
      containerPosition() {
        return this.position === '' || this.position === undefined
          ? `v-container-bottom_center`
          : `v-container-${this.position}`;
      }
    },
    methods: {
      commit(toast: any) {
        let doublicate = false;
        this.position = toast.position;
        this.show = toast.show;
        this.toasts.map((items: any) => {
          if (
            items.message === toast.toastData.message &&
            items.type === toast.toastData.type
          ) {
            doublicate = true;
            return (items.counter += 1);
          }
          return items;
        });

        if (doublicate === false) {
          this.toasts.push(toast.toastData);
          doublicate = false;
        }
      },
      closeToast(index: number) {
        this.toasts.splice(index, 1);
      },
      closeToastOne(id: string) {
        let dialogIndex = this.toasts.findIndex((item: any) => item.id == id);
        this.toasts.splice(dialogIndex, 1);
      }
    }
  });
</script>

<style lang="scss">
  .v-toast-container {
    position: fixed;
    width: 320px;

    &.v-container-top_center {
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    &.v-container-bottom_center {
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
    &.v-container-bottom_left {
      left: 10px;
      bottom: 10px;
    }
    &.v-container-top_left {
      left: 0;
      top: 0;
    }
    &.v-container-bottom_right {
      right: 0;
      bottom: 0;
    }
    &.v-container-top_right {
      right: 0;
      top: 0;
    }
    .v-toast {
      position: relative;
      max-height: 200px;
      margin-bottom: 1rem;
      border-radius: 4px;
      padding: 12px 8px;
      width: 100%;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 10px,
        rgba(0, 0, 0, 0.05) 0px 2px 15px;
      &.v-toast-success {
        background-color: #28a745;
        color: #fff;
      }
      &.v-toast-warning {
        background-color: #ffc107;
        color: #fff;
      }
      &.v-toast-info {
        background-color: #17a2b8;
        color: #fff;
      }
      &.v-toast-error {
        background-color: #ff1744;
        color: #fff;
      }
      .v-toast-content {
        display: flex;
        align-items: center;
        .v-toast-message {
          text-align: center;
          font-size: 1rem;
        }
        .v-toast-counter {
          flex: 0 0 auto;
          background-color: #fff;
          color: #000;
          font-size: 1rem;
          font-weight: 500;
          width: 24px;
          height: 24px;
          border-radius: 100%;
          line-height: 24px;
          vertical-align: middle;
          text-align: center;
          margin-left: 10px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 10px,
            rgba(0, 0, 0, 0.05) 0px 2px 15px;
        }
      }
      .v-toast-icon {
        cursor: pointer;
        margin-bottom: 5px;
        width: 24px;
        height: 24px;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
