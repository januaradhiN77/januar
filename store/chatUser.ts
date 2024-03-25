import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

export const useChatUser = defineStore('chatUser', () => {
  const id = useSessionStorage('userid', () => uuid())
  const name = useSessionStorage('name', () => '')
  const avatarId = useSessionStorage('avatar', () => uuid())

  function setName(n: string) {
    name.value = n
  }
  function setAvatar(id: string) {
    avatarId.value = id
  }
  return { id, name, avatarId, setName, setAvatar }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useChatUser as any, import.meta.hot),
  )
}
