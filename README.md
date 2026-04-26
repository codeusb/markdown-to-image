# Markdown to Image

A small browser extension for turning Markdown copied from LLMs into a clean PNG image from the browser side panel.

## Features

- Type or paste Markdown directly.
- Preview the rendered document in the right-side panel.
- Copy the rendered image to the clipboard.
- Download the rendered image as a PNG file.
- Keep the current page open while editing and exporting.

## Download

Download the latest release zip:

https://github.com/codeusb/markdown-to-image/releases/latest/download/chrome-mv3-prod.zip

After downloading, unzip `chrome-mv3-prod.zip` to a local folder. Chrome and Edge both need the unzipped folder when installing manually.

## Install in Chrome

1. Open `chrome://extensions`.
2. Turn on `Developer mode` in the top-right corner.
3. Click `Load unpacked`.
4. Select the unzipped `chrome-mv3-prod` folder.
5. Click the extension icon to open the side panel.

## Install in Microsoft Edge

1. Open `edge://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select the unzipped `chrome-mv3-prod` folder.
5. Click the extension icon to open the side panel.

## Usage

1. Paste Markdown into the editor.
2. Check the rendered preview.
3. Click `Copy image` to copy the preview as an image, or `Download image` to save it as a PNG.

## Development

```bash
pnpm dev
```

Load the generated Chrome extension from `build/chrome-mv3-dev`.

## Production Build

```bash
pnpm build
```

## Package Release Zip

```bash
pnpm package
```

The release zip is generated at `build/chrome-mv3-prod.zip`.
