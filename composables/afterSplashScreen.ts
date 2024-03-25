export default function (fn: () => void) {
  const splashScreenFinish = useState('spfinish', () => false)
  onMounted(() => {
    if (splashScreenFinish.value) {
      fn()
    }
    else {
      const w = watch(splashScreenFinish, (finish) => {
        if (finish) {
          fn()
          w()
        }
      })
    }
  })
}
