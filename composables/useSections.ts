// import { useSectionStore } from '@/store/index'

// export default function (sectionData?: Ref<HTMLElement[] | null>) {
//   const store = useSectionStore()
//   const sections = ref<HTMLElement[]>([])
//   const currentSection = ref<string>(store.currentSection)
//   const currentSectionNode = computed(() => {
//     return getSection(currentSection.value)
//   })

//   const { smoothScroll } = useSmoothScroll()
//   onMounted(() => {
//     if (sectionData?.value) sections.value = [...sectionData.value]
//     const section = getSection(currentSection.value)
//     if (section) goToSection(section, false)
//   })

//   function goToSection(sectionElement?: HTMLElement, smooth = true) {
//     const section = sectionElement || getSection(currentSection.value)
//     if (sectionElement) { currentSection.value = sectionElement.dataset.section ?? 'home' }

//     if (section) {
//       if (smooth) smoothScroll(section.offsetTop)
//       else scrollTo(0, section.offsetTop)

//       setTimeout(() => {
//         store.setSection(section.dataset.section ?? 'home')
//       }, 200)
//     }
//   }

//   function getSection(sectionId: string | number, modifier = 0) {
//     if (Number.isInteger(sectionId)) { modifier = sectionId as number }

//     const id = Number.isInteger(sectionId) ? currentSection.value : sectionId
//     const index = sections.value.findIndex(i => i.dataset.section === id)
//     const sectionElem = sections.value[index + modifier]
//     if (!sectionElem) return null
//     return sectionElem
//   }

//   function goToNextSection() {
//     const section = getSection(1)
//     if (section) goToSection(section)
//   }

//   function goToPrevSection() {
//     const section = getSection(-1)
//     if (section) goToSection(section)
//   }

//   function goToFirstSection() {
//     const section = sections.value[0]
//     if (section) goToSection(section)
//   }

//   function goToLastSection() {
//     const section = sections.value[sections.value.length - 1]
//     if (section) goToSection(section)
//   }

//   return { goToNextSection, goToPrevSection, goToSection, goToFirstSection, goToLastSection, sections, currentSection, currentSectionNode }
// }
