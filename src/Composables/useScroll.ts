// src/composables/useScroll.ts

export function useScroll() {
  const scrollTo = (sectionId: string) => {
    // Verifica si estamos en el cliente (navegador) antes de acceder a document
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return {
    scrollTo
  }
}