// @ts-ignore: this is safe, we don't want to actually make language.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import languageScript from "./scripts/language.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import languageStyle from "./styles/language.scss"
import { classNames } from "../util/lang"

const Language: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const path = typeof window !== 'undefined' ? window.location.pathname : ''
    const parts = path.split('/')
    const isKoreanPath = parts[1] === 'i18n' && parts[2] === 'ko'
    const currentLang = isKoreanPath ? 'ko' : 'en'
    
    return (
        <div class={classNames(displayClass, "language-selector")}>
            <button
                class={`lang-button ${currentLang === 'en' ? 'active' : ''}`}
                data-lang="en"
                aria-label="Switch to English"
            >
                En
            </button>
            <button
                class={`lang-button ${currentLang === 'ko' ? 'active' : ''}`}
                data-lang="ko"
                aria-label="한국어로 전환"
            >
                Ko
            </button>
        </div>
    )
}

Language.beforeDOMLoaded = languageScript
Language.css = languageStyle
export default (() => Language) satisfies QuartzComponentConstructor
