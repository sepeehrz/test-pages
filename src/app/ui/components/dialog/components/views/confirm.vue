<template>
  <div v-if="dialog" class="dialog">
    <div class="dialog-header">
      <div
        v-if="dialog.type == 'warning'"
        class="dialog-icon warning-icon"></div>
      <div
        v-if="dialog.type == 'question'"
        class="dialog-icon question-icon"></div>
    </div>
    <h2 v-if="dialog.title" class="dialog-title">{{ dialog.title }}</h2>
    <div v-if="dialog.message" class="dialog-message">
      {{ dialog.message }}
    </div>
    <div class="dialog-actions">
      <button @click="$emit('close', 'close dialog')">
        {{ dialog.cancel_txt }}
      </button>
      <button @click="$emit('hide', true)">{{ dialog.ok_txt }}</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {IDialog} from '../../types/types';
  interface Props {
    dialog: IDialog;
  }

  defineProps<Props>();

  const emits = defineEmits<{
    (e: 'close', items: string): void;
    (e: 'hide', items: boolean): void;
  }>();
</script>

<style lang="scss"></style>
