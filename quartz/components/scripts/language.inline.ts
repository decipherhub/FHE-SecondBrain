const userLang = 'en'  // Always default to English
const currentLang = localStorage.getItem('lang') || userLang

function getCurrentPathWithoutLang() {
    const path = window.location.pathname
    const parts = path.split('/')
    if (parts[1] === 'i18n') {
        parts.splice(1, 2)
    }
    return parts.join('/').replace(/^\/+/, '')
}

function navigateToUrl(url: string) {
    window.location.href = url
}

function emitLangChangeEvent(lang: string) {
    const event = new CustomEvent('langchange', { detail: { lang } })
    document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
    const switchLang = async (e: Event) => {
        const button = e.target as HTMLButtonElement
        const newLang = button.dataset.lang
        if (!newLang) return

        document.documentElement.setAttribute("lang", newLang)
        localStorage.setItem("lang", newLang)
        emitLangChangeEvent(newLang)

        const currentPath = getCurrentPathWithoutLang()
        const newUrl = newLang === "en" ? `/${currentPath}` : `/i18n/${newLang}/${currentPath}`

        await navigateToUrl(newUrl)
    }

    const langButtons = document.querySelectorAll(".lang-button")
    langButtons.forEach(button => {
        button.addEventListener("click", switchLang)
        window.addCleanup(() => button.removeEventListener("click", switchLang))
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") ?? userLang
    document.documentElement.setAttribute("lang", lang)
    emitLangChangeEvent(lang)

    // Update active button state
    const langButtons = document.querySelectorAll(".lang-button")
    langButtons.forEach(button => {
        if (button instanceof HTMLButtonElement) {
            button.classList.toggle('active', button.dataset.lang === lang)
        }
    })
})

document.addEventListener("langchange", (event) => {
  const newLang = event.detail.lang
  console.log(`Language changed to: ${newLang}`)

  // Update language selector value
  const langSelect = document.querySelector("#language-select") as HTMLSelectElement
  if (langSelect) {
    langSelect.value = newLang
  }
})
