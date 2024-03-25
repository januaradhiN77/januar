<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useNotifications } from '~~/store/notifications'

const notifData = useNotifications()
const { deleteNotif, showNotif } = notifData
const { currentNotif: notifs } = storeToRefs(notifData)
const containerNotif = ref<any>()
function beforeLeave(el: Element) {
  if (containerNotif.value) {
    const s = el as HTMLElement
    const parentRect = containerNotif.value.$el.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    s.style.left = `${rect.left - parentRect.left}px`
    s.style.top = `${rect.top - parentRect.top}px`
    s.style.width = `${rect.width}px`
  }
}
</script>

<template>
  <teleport to="body">
    <div class="pointer-events-none fixed inset-0 z-aboveNav m-10 md:m-16">
      <TransitionGroup
        ref="containerNotif"
        tag="div"
        class="relative flex h-full w-full flex-col items-center justify-end gap-4 p-4"
        name="list"
        @before-leave="beforeLeave"
        @after-leave="showNotif()"
      >
        <div v-for="notif in notifs" :key="notif.id" class="z-aboveNav mx-auto max-md:w-[85%] md:min-w-[300px] md:max-w-[350px] lg:min-w-[300px] lg:max-w-[400px]">
          <NotificationBase
            v-if="notif.type === 'success'"
            color="bg-green-500"
            icon="ic:round-check"
            :default-title="notif?.title ?? 'Success'"
            :notif="notif"
            @close="deleteNotif(notif.id)"
          />

          <NotificationBase
            v-else-if="notif.type === 'danger'"
            color="bg-red-500"
            icon="mdi:close-thick"
            :default-title="notif?.title ?? 'Danger'"
            :notif="notif"
            @close="deleteNotif(notif.id)"
          />

          <NotificationBase
            v-else-if="notif.type === 'warn'"
            color="bg-yellow-500"
            icon="mdi:exclamation-thick"
            :default-title="notif?.title ?? 'Warning'"
            :notif="notif"
            @close="deleteNotif(notif.id)"
          />

          <NotificationBase
            v-else
            color="bg-blue-500"
            icon="bi:info-lg"
            :default-title="notif?.title ?? 'Info'"
            :notif="notif"
            @close="deleteNotif(notif.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </teleport>
</template>
