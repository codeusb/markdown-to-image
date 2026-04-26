import { toBlob, toPng } from "html-to-image"
import { marked } from "marked"
import { useEffect, useMemo, useRef, useState } from "react"

marked.setOptions({
  breaks: true,
  gfm: true
})

function sanitizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html")

  doc
    .querySelectorAll("script, iframe, object, embed, link, meta")
    .forEach((node) => {
      node.remove()
    })

  doc.body.querySelectorAll("*").forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      const name = attribute.name.toLowerCase()
      const value = attribute.value.trim().toLowerCase()

      if (name.startsWith("on")) {
        node.removeAttribute(attribute.name)
      }

      if (
        (name === "href" || name === "src") &&
        value.startsWith("javascript:")
      ) {
        node.removeAttribute(attribute.name)
      }
    }
  })

  return doc.body.innerHTML
}

export function MarkdownImageWorkspace() {
  const previewRef = useRef<HTMLDivElement>(null)
  const [markdown, setMarkdown] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isEditorExpanded, setIsEditorExpanded] = useState(true)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true)
  const [toast, setToast] = useState("")

  const previewHtml = useMemo(() => {
    return sanitizeHtml(marked.parse(markdown || " ") as string)
  }, [markdown])

  useEffect(() => {
    const cachedMarkdown = localStorage.getItem("markdown-to-image:content")

    if (cachedMarkdown) {
      setMarkdown(cachedMarkdown)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("markdown-to-image:content", markdown)
  }, [markdown])

  useEffect(() => {
    if (!toast) return

    const timer = window.setTimeout(() => setToast(""), 1800)

    return () => window.clearTimeout(timer)
  }, [toast])

  async function createPngDataUrl() {
    if (!previewRef.current) return ""

    return toPng(previewRef.current, {
      backgroundColor: "#ffffff",
      cacheBust: true,
      pixelRatio: 2
    })
  }

  async function copyImage() {
    try {
      const blob = await toBlob(previewRef.current!, {
        backgroundColor: "#ffffff",
        cacheBust: true,
        pixelRatio: 2
      })

      if (!blob) {
        window.alert("图片复制失败")
        return
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      setToast("图片已复制")
    } catch {
      window.alert("当前浏览器不支持直接复制图片，可先下载 PNG")
    }
  }

  async function downloadImage() {
    try {
      let url = imageUrl

      if (!url) {
        url = await createPngDataUrl()
        setImageUrl(url)
      }

      const link = document.createElement("a")
      link.download = `markdown-image-${Date.now()}.png`
      link.href = url
      link.click()
      setToast("图片已下载")
    } catch {
      window.alert("下载失败，请重新生成图片")
    }
  }

  return (
    <main className="workspaceShell">
      <style>{styles}</style>

      <section
        className={`editorPanel ${isEditorExpanded ? "" : "isCollapsed"}`}>
        <div className="panelHeader">
          <span>Markdown</span>
          <div className="panelActions">
            <small>{markdown.length} 字符</small>
            <button
              className="toggleButton"
              type="button"
              onClick={() => setIsEditorExpanded((expanded) => !expanded)}>
              {isEditorExpanded ? "收起" : "展开"}
            </button>
          </div>
        </div>
        {isEditorExpanded ? (
          <textarea
            aria-label="Markdown 输入"
            placeholder="把 Markdown 内容粘贴到这里..."
            spellCheck={false}
            value={markdown}
            onChange={(event) => {
              setMarkdown(event.target.value)
              setImageUrl("")
            }}
          />
        ) : null}
      </section>

      <section
        className={`previewPanel ${isPreviewExpanded ? "" : "isCollapsed"}`}>
        <div className="panelHeader">
          <span>预览效果</span>
          <div className="panelActions">
            <button
              className="compactButton primaryButton"
              disabled={!markdown.trim()}
              onClick={copyImage}>
              复制图片
            </button>
            <button
              className="compactButton"
              disabled={!markdown.trim()}
              onClick={downloadImage}>
              下载图片
            </button>
            <button
              className="toggleButton"
              type="button"
              onClick={() => setIsPreviewExpanded((expanded) => !expanded)}>
              {isPreviewExpanded ? "收起" : "展开"}
            </button>
          </div>
        </div>
        {isPreviewExpanded ? (
          <div className="previewViewport">
            <article
              ref={previewRef}
              className="markdownPreview"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        ) : (
          <article
            ref={previewRef}
            className="markdownPreview hiddenCapture"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        )}
      </section>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  )
}

const styles = `
  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: #f6f3ef;
    color: #232323;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
  }

  .workspaceShell {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    min-width: 360px;
    height: 100vh;
    padding: 16px;
    overflow: hidden;
    background: #f6f3ef;
  }

  .editorPanel,
  .previewPanel {
    display: flex;
    flex: 1 1 0;
    min-height: 0;
    flex-direction: column;
    border: 1px solid #ded8cf;
    border-radius: 8px;
    background: #fffaf3;
    overflow: hidden;
  }

  .editorPanel {
    flex: 0.95 1 0;
  }

  .previewPanel {
    flex: 1.05 1 0;
  }

  .editorPanel.isCollapsed,
  .previewPanel.isCollapsed {
    flex: 0 0 auto;
  }

  .panelHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 36px;
    padding: 8px 10px 8px 12px;
    border-bottom: 1px solid #ded8cf;
    color: #3a3631;
    font-size: 13px;
    font-weight: 700;
    flex: 0 0 auto;
  }

  .panelHeader small {
    color: #786f65;
    font-size: 12px;
    font-weight: 500;
  }

  .panelActions {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  textarea {
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    display: block;
    padding: 13px;
    border: 0;
    outline: none;
    resize: none;
    background: #fffdf9;
    color: #24211e;
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 13px;
    line-height: 1.6;
  }

  .previewViewport {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: 16px;
    background:
      linear-gradient(90deg, rgba(35, 35, 35, 0.035) 1px, transparent 1px),
      linear-gradient(rgba(35, 35, 35, 0.035) 1px, transparent 1px);
    background-color: #ece8df;
    background-size: 18px 18px;
  }

  .markdownPreview {
    width: min(680px, 100%);
    min-height: 120px;
    margin: 0 auto;
    padding: 32px 34px;
    background: #ffffff;
    color: #202020;
    border: 1px solid #e6e1d9;
    box-shadow: 0 12px 28px rgba(48, 39, 29, 0.12);
    font-size: 16px;
    line-height: 1.72;
  }

  .hiddenCapture {
    position: fixed;
    left: -10000px;
    top: 0;
    pointer-events: none;
  }

  .markdownPreview > :first-child {
    margin-top: 0;
  }

  .markdownPreview > :last-child {
    margin-bottom: 0;
  }

  .markdownPreview h1,
  .markdownPreview h2,
  .markdownPreview h3 {
    margin: 1.2em 0 0.45em;
    color: #171717;
    line-height: 1.25;
  }

  .markdownPreview h1 {
    padding-bottom: 10px;
    border-bottom: 2px solid #222;
    font-size: 30px;
  }

  .markdownPreview h2 {
    font-size: 22px;
  }

  .markdownPreview h3 {
    font-size: 18px;
  }

  .markdownPreview p,
  .markdownPreview ul,
  .markdownPreview ol,
  .markdownPreview blockquote,
  .markdownPreview pre {
    margin: 0.85em 0;
  }

  .markdownPreview ul,
  .markdownPreview ol {
    padding-left: 1.45em;
  }

  .markdownPreview blockquote {
    padding: 2px 0 2px 16px;
    border-left: 4px solid #1f7a68;
    color: #4d4a45;
    background: #f5faf8;
  }

  .markdownPreview code {
    padding: 2px 5px;
    border-radius: 5px;
    background: #f0eee9;
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.9em;
  }

  .markdownPreview pre {
    overflow: auto;
    padding: 14px;
    border-radius: 8px;
    background: #202225;
    color: #f7f2e8;
  }

  .markdownPreview pre code {
    padding: 0;
    background: transparent;
    color: inherit;
  }

  .markdownPreview table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 14px;
  }

  .markdownPreview th,
  .markdownPreview td {
    padding: 8px 10px;
    border: 1px solid #ddd7cd;
    text-align: left;
  }

  .markdownPreview th {
    background: #f3efe7;
  }

  button {
    min-height: 40px;
    min-width: 0;
    border: 1px solid #cfc7bb;
    border-radius: 7px;
    background: #ffffff;
    color: #2c2925;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
  }

  button:hover:not(:disabled) {
    background: #f7f3ed;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .primaryButton {
    border-color: #1f7a68;
    background: #1f7a68;
    color: #ffffff;
  }

  .primaryButton:hover:not(:disabled) {
    background: #176655;
  }

  .toggleButton {
    min-height: 28px;
    padding: 0 10px;
    font-size: 12px;
  }

  .compactButton {
    min-height: 28px;
    padding: 0 12px;
    font-size: 12px;
  }

  .toast {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    padding: 9px 13px;
    border-radius: 7px;
    background: rgba(31, 122, 104, 0.96);
    color: #ffffff;
    box-shadow: 0 10px 24px rgba(35, 35, 35, 0.18);
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  }
`
