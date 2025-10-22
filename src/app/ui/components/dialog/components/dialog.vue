<template>
  <dialogWindow
    v-for="dialog in dialogs"
    :key="dialog.id"
    :dialog="dialog"
    @close="close"
    @hide="hide"></dialogWindow>
</template>
<script lang="ts">
  import dialogWindow from './dialog-window.vue';
  import {defineComponent} from 'vue';
  import type {IDialog} from '../types/types';

  export default defineComponent({
    components: {
      dialogWindow
    },
    data() {
      return {
        dialogs: <any>[]
      };
    },
    methods: {
      commit(data: any) {
        this.dialogs.push(data);
      },
      hide({dialog, data}: any) {
        dialog.show = false;
        let dialogIndex = this.dialogs.findIndex(
          (item: IDialog) => item.id == dialog.id
        );
        if (dialogIndex !== -1) {
          this.dialogs.splice(dialogIndex, 1);
        }
        dialog.resolve(data);
      },
      close({dialog}: any) {
        dialog.show = false;
        let dialogIndex = this.dialogs.findIndex(
          (item: IDialog) => item.id == dialog.id
        );
        if (dialogIndex !== -1) {
          this.dialogs.splice(dialogIndex, 1);
        }
        dialog.resolve(false);
      }
    }
  });
</script>

<style lang="scss">
  @use 'sass:color';
  .dialog-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;

    .backdrop {
      background: rgba(0, 0, 0, 0.2);
      width: 100%;
      position: absolute;
      height: 100%;
      z-index: -1;
    }
    .dialog-content-wrapper {
      background: #fff;
      padding: 0;
      max-width: 100%;
      border-radius: 28px;
      position: relative;
      display: block;
      overflow: auto;
    }

    .dialog {
      width: 312px;
      text-align: center;
      border-radius: 28px;
      background: #fff;
      .dialog-header {
        display: flex;
        align-items: center;
        justify-content: center;
        .dialog-icon {
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          width: 5rem;
          height: 5rem;
          zoom: normal;
          border: 0.25em solid transparent;
          border-radius: 50%;
          line-height: 5rem;
          cursor: default;
          user-select: none;
          margin: 24px 0 16px;
          &:before {
            font-size: 3.75rem;
          }

          &.warning-icon {
            border-color: #facea8;
            color: #f8bb86;

            &:before {
              content: '!';
              margin-top: 8px;
            }
          }
          &.error-icon {
            border-color: #f27474;

            i {
              color: color.adjust(#f27474, $lightness: -20%);
              font-size: 40px;
            }
          }

          &.success-icon {
            border-color: rgba(#a5dc86, 0.5);

            i {
              color: color.adjust(#a5dc86, $lightness: -20%);
              font-size: 40px;
            }
          }
          &.question-icon {
            border-color: #c9dae1;
            color: #87adbd;

            &:before {
              content: '؟';
              margin-top: 8px;
            }
          }
        }
      }
      .dialog-title {
        font-weight: 500;
        font-size: 1.175rem;
        color: #1c1b1f;
        margin: 0 0 1rem;
      }
      .dialog-message {
        color: #49454f;
        text-align: center;
        padding-bottom: 16px;
      }
      .prompt-input {
        height: 40px;
        margin-bottom: 16px;
        width: 80%;
        border-radius: 8px;
        border: 1px solid #000;
      }
      .dialog-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        color: inherit;
        padding: 24px 0;
        border-top: 1px solid $primary-color;
        button {
          color: #000;
          padding: 10px 24px;
          border-radius: 100px;
          border: 1px solid #ccc;
          cursor: pointer;

          &:first-child {
            margin-left: 8px;
            color: #1c1d06;
            background-color: #ced4da;
          }

          &:nth-child(2) {
            background-color: $primary-color;
            color: #fff;
          }
        }
      }
    }
  }
</style>
