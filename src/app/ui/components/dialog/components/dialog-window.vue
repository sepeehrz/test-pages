<template>
  <div class="dialog-container" :class="dialog.container_custom_class || ''">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      appear
      @after-leave="animationEnded('backdrop')">
      <div v-if="show" class="backdrop" @click="close('click-backDrop')"></div>
    </transition>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
      appear
      @after-leave="animationEnded('content')">
      <div
        v-if="show"
        class="dialog-wrapper"
        :class="dialog.dialog_wrapper_custom_class || ''">
        <component
          v-bind="dialog.props"
          :is="{...dialog.component}"
          :scope="dialog.scope"
          :dialog="dialog"
          @close="close"
          @hide="hide"></component>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import {IDialog} from '../types/types';
  import {ref} from 'vue';
  interface Props {
    dialog: IDialog;
  }

  const props = defineProps<Props>();

  const emits = defineEmits<{
    (e: 'close', items: any): void;
    (e: 'hide', items: any): void;
  }>();

  const show = ref(true);
  const endedAnimations: any = ref([]);
  const returnData = ref(null);
  const emit_type: any = ref('close');

  function animationEnded(type: any) {
    endedAnimations.value.push(type);
    if (
      endedAnimations.value.indexOf('backdrop') !== -1 &&
      endedAnimations.value.indexOf('content') !== -1
    ) {
      emits(emit_type.value, {
        dialog: props.dialog,
        data: returnData.value
      });
    }
  }
  function close(reason: any) {
    if (
      reason === 'click-backDrop' &&
      props.dialog.persistent &&
      props.dialog.persistent === true
    ) {
      return;
    }
    show.value = false;
    returnData.value = reason;
    emit_type.value = 'close';
  }
  function hide(data: any) {
    show.value = false;
    returnData.value = data;
    emit_type.value = 'hide';
  }
</script>

<style lang="scss">
  .dialog-container {
    .animated {
      animation-duration: 0.4s;
    }

    .zoomIn {
      animation-name: zoomIn;
    }

    .zoomOut {
      animation-name: zoomOut;
    }

    .fadeOut {
      animation-name: fadeOut;
    }

    .fadeIn {
      animation-name: fadeIn;
    }
  }
</style>
