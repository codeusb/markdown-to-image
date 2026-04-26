# Markdown to Image

A small Plasmo browser extension for turning Markdown copied from LLMs into a clean PNG image from the Chrome side panel.

## Features

- Paste Markdown from the clipboard or type it directly.
- Preview the rendered document in the right-side panel.
- Generate a high-resolution PNG from the preview.
- Copy the rendered image to the clipboard.
- Download the rendered image as a PNG file.
- Keep the current page open while editing and exporting.

## Development

```bash
pnpm dev
```

Load the generated Chrome extension from `build/chrome-mv3-dev`.

## Production Build

```bash
pnpm build
```
