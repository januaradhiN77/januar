/* eslint-disable no-console */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error: any) => {
    console.error(error)
    showError({ statusCode: 500, statusMessage: error.message })
  }
})
