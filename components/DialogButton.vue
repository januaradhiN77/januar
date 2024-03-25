<script lang="ts" setup>
const isOpen = ref(false)

function close() {
  isOpen.value = false
}
function open() {
  isOpen.value = true
}
</script>

<template>
  <div>
    <Teleport to="body">
      <Transition name="dialog">
        <div v-if="isOpen">
          <div class="dialog-bg z-aboveNav fixed inset-0 bg-black/50" @click="close" />
          <div class="z-aboveNav fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div class="dialog w-full h-full rounded-[3rem] p-10 bg-navy-1 min-h-[300px] min-w-[350px]">
              <slot name="dialog" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <button type="button" class="w-full h-full" @click="open">
      <slot />
    </button>
  </div>
</template>
