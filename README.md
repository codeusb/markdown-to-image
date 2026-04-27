# Markdown to Image

[中文](#中文) | [English](#english)

## 中文

一个浏览器侧边栏扩展，可以把从 LLM 复制出来的 Markdown 渲染成干净的 PNG 图片，方便直接复制到笔记、文档或聊天工具里。

### 功能

- 直接输入或粘贴 Markdown。
- 在浏览器右侧边栏实时预览渲染效果。
- 一键把预览内容复制为图片。
- 一键下载 PNG 图片。
- 不离开当前网页即可编辑、预览和导出。

### 下载

下载最新版本：

https://github.com/codeusb/markdown-to-image/releases/latest/download/chrome-mv3-prod.zip

下载后，请先把 `chrome-mv3-prod.zip` 解压到本地文件夹。Chrome 和 Edge 手动安装扩展时，都需要选择解压后的文件夹。

### Chrome 安装

1. 打开 `chrome://extensions`。
2. 打开右上角的 `开发者模式`。
3. 点击 `加载已解压的扩展程序`。
4. 选择解压后的 `chrome-mv3-prod` 文件夹。
5. 点击浏览器扩展图标，打开右侧边栏。

### Microsoft Edge 安装

1. 打开 `edge://extensions`。
2. 打开 `开发人员模式`。
3. 点击 `加载解压缩的扩展` 或 `Load unpacked`。
4. 选择解压后的 `chrome-mv3-prod` 文件夹。
5. 点击浏览器扩展图标，打开右侧边栏。

### 使用

1. 把 Markdown 粘贴到编辑区。
2. 在预览区检查渲染效果。
3. 点击 `复制图片` 把预览内容复制为图片，或点击 `下载图片` 保存为 PNG。

### 开发

```bash
pnpm dev
```

开发模式下，加载 `build/chrome-mv3-dev`。

### 生产构建

```bash
pnpm build
```

### 打包 Release Zip

```bash
pnpm package
```

Release zip 会生成在 `build/chrome-mv3-prod.zip`。

## English

A browser side-panel extension for turning Markdown copied from LLMs into a clean PNG image that can be pasted into notes, documents, or chat apps.

### Features

- Type or paste Markdown directly.
- Preview the rendered document in the right-side panel.
- Copy the rendered preview as an image.
- Download the rendered preview as a PNG file.
- Keep the current page open while editing, previewing, and exporting.

### Download

Download the latest release zip:

https://github.com/codeusb/markdown-to-image/releases/latest/download/chrome-mv3-prod.zip

After downloading, unzip `chrome-mv3-prod.zip` to a local folder. Chrome and Edge both need the unzipped folder when installing manually.

### Install in Chrome

1. Open `chrome://extensions`.
2. Turn on `Developer mode` in the top-right corner.
3. Click `Load unpacked`.
4. Select the unzipped `chrome-mv3-prod` folder.
5. Click the extension icon to open the side panel.

### Install in Microsoft Edge

1. Open `edge://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select the unzipped `chrome-mv3-prod` folder.
5. Click the extension icon to open the side panel.

### Usage

1. Paste Markdown into the editor.
2. Check the rendered preview.
3. Click `Copy image` to copy the preview as an image, or `Download image` to save it as a PNG.

### Development

```bash
pnpm dev
```

Load the generated Chrome extension from `build/chrome-mv3-dev`.

### Production Build

```bash
pnpm build
```

### Package Release Zip

```bash
pnpm package
```

The release zip is generated at `build/chrome-mv3-prod.zip`.
