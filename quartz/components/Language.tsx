// @ts-ignore: this is safe, we don't want to actually make language.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import languageScript from "./scripts/language.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import languageStyle from "./styles/language.scss"
import { classNames } from "../util/lang"

const Language: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const currentLang = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en'
    
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
