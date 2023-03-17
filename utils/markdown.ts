import { Renderer, marked } from 'marked'
import highlight from '@/utils/highlight'
import { SITE_URL } from '@/config'
import { LOZAD_CLASS_NAME } from '@/composables/lozad'

const trimHTML = (html: string) => html.replace(/\s+/g, ' ').replace(/\n/g, ' ')

// MARK: escape vs sanitize https://zhuanlan.zhihu.com/p/421281945
// sanitize and escape are overlapping, for normal users, no html is allowed, so sanitize is not required.
// if sanitize is required, you will encounter many problems.
const sanitizeHTML = (content: string) => content

interface RendererGetterOption {
  islozad: boolean
  sanitize: boolean
  text: (text: string) => string
  headingID: (html: string, level: number, raw: string) => string
}

const getRenderer = (options: Partial<RendererGetterOption>) => {
  const renderer = new Renderer()
  // text
  renderer.text = (text) => {
    return options?.text ? options.text(text) : text
  }

  // html: escape > sanitize
  renderer.html = (html) => {
    const trimmed = html.trim()
    const transformed = trimmed
    // https://github.com/apostrophecms/sanitize-html#default-options
    return options?.sanitize ? sanitizeHTML(_Escape(transformed)) : transformed
  }

  // heading
  renderer.heading = (html, level, raw) => {
    const idText = options?.headingID ? `id="${options.headingID(html, level, raw)}"` : ''
    const safeedRaw = _Escape(raw)
    return `<h${level} ${idText} alt="${safeedRaw}" title="${safeedRaw}">${html}</h${level}>`
  }

  // paragraph
  renderer.paragraph = (text) => {
    const trimmed = text.trim()
    const isBlockChild = ['p', 'div', 'figure'].some((tag) => {
      return trimmed.startsWith(`<${tag}`) && trimmed.endsWith(`</${tag}>`)
    })
    return isBlockChild ? text : `<p>${text}</p>`
  }

  // checkbox
  renderer.checkbox = (checked) => {
    return checked
      ? '<i class="checkbox checked iconfont icon-checkbox-selected"></i>'
      : '<i class="checkbox iconfont icon-checkbox-unselected"></i>'
  }

  // link: sanitize
  renderer.link = (href, title, text) => {
    const isSelf = href
    const isImageLink = text.includes('<img')
    const textValue = options?.sanitize ? _Escape(text) : text
    const hrefValue = href
    const titleValue = options?.sanitize ? _Escape(title!) : title

    return sanitizeHTML(
      trimHTML(`
         <a
           href="${hrefValue}"
           target="_blank"
           class="${isImageLink ? 'image-link' : 'link'}"
           title="${titleValue || (isImageLink ? hrefValue : textValue)}"
           ${isSelf ? '' : 'rel="external nofollow noopener"'}
         >${textValue}</a>
       `),
    )
  }

  // image: sanitize(title, alt) > popup
  renderer.image = (src, title, alt) => {
    // HTTP > proxy
    const source = src!.replace(/^http:\/\//gi, `${SITE_URL}/`)
    const titleValue = sanitizeHTML(_Escape(title || alt))
    const altValue = sanitizeHTML(_Escape(alt!))
    if (options?.islozad) {
      // figure > alt
      return trimHTML(`
      <div class="figure-wrapper">
      <figure class="image ${altValue ? 'caption' : ''}" data-status="loading">
        <div class="placeholder error">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m7 19l5-5l1.88 1.88c-.55.91-.88 1.98-.88 3.12H7m3-8.5C10 9.67 9.33 9 8.5 9S7 9.67 7 10.5S7.67 12 8.5 12s1.5-.67 1.5-1.5m3.09 9.5H6V4h7v5h5v4.09c.33-.05.66-.09 1-.09c.34 0 .67.04 1 .09V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.35-.61-.6-1.28-.72-2m8.03-4.54L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19l2.13-2.12l-1.42-1.42Z"/></svg>
        </div>
        <div class="placeholder loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <img
          class="${LOZAD_CLASS_NAME}"
          data-src="${source}"
          ${altValue ? `alt="${altValue}"` : ''}
          ${titleValue ? `title="${titleValue}"` : ''}
          onload="this.parentElement.dataset.status = 'loaded'"
          onerror="this.parentElement.dataset.status = 'error'"
          onclick="if (window.utils) window.utils.openImgPopup('${src}')"
        />
      </figure>
    </div>
       `)
    }
    else {
      return trimHTML(
        `<img
          class=""
          src="${source}"
          title="${titleValue}"
          alt="${altValue}"
          onclick="if (window.utils) window.utils.openImgPopup('${src}')"
      />`,
      )
    }
  }

  // code: line number
  renderer.code = function (code, lang, isEscaped) {
    if (renderer.options.highlight) {
      const output = renderer.options.highlight(code, lang || '')
      if (output != null && output !== code) {
        isEscaped = true
        code = output
      }
    }

    const lineNumbers = code
      .split('\n')
      .map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
      .join('')

    const readOnlyAttrs = `
      contenteditable="true"
      oncut="return false"
      onpaste="return false"
      onkeydown="if(event.metaKey) return true; return false;"
    `

    return lang
      ? `
        <pre data-lang="${lang}" >
          <ul class="code-lines">${lineNumbers}</ul>
          <code
            ${readOnlyAttrs}
            class="${renderer.options.langPrefix}${_Escape(lang)}"
          >${isEscaped ? code : _Escape(code)}\n</code>
        </pre>\n
      `
      : `
        <pre>
          <ul class="code-lines">${lineNumbers}</ul>
          <code ${readOnlyAttrs} class="hljs">${isEscaped ? code : _Escape(code)}\n</code>
        </pre>
      `
  }
  return renderer
}

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs language-',
  highlight(code, language) {
    return highlight.getLanguage(language)
      ? highlight.highlight(code, { language }).value
      : highlight.highlightAuto(code).value
  },
})

export interface MarkdownRenderOption {
  islozad?: boolean
  sanitize?: boolean
  relink?: boolean
  headingIDRenderer?: RendererGetterOption['headingID']
}
export const markdownToHTML = (markdown: string, options?: MarkdownRenderOption) => {
  if (!markdown || typeof markdown !== 'string')
    return ''

  const renderOptions: Partial<RendererGetterOption> = {
    headingID: options?.headingIDRenderer,
  }

  // sanitize
  if (options?.sanitize)
    renderOptions.sanitize = true
  if (options?.islozad)
    renderOptions.islozad = true
  const renderer = getRenderer(renderOptions)
  return marked.parse(markdown, { renderer })
}

