function enableSidePanelOnActionClick() {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) =>
      console.error("Failed to enable side panel action click", error)
    )
}

enableSidePanelOnActionClick()

chrome.runtime.onInstalled.addListener(enableSidePanelOnActionClick)
chrome.runtime.onStartup.addListener(enableSidePanelOnActionClick)
