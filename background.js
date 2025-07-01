let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  trackTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    currentTab = new URL(tab.url).hostname;
    startTime = Date.now();
  });
});

function trackTime() {
  if (currentTab && startTime) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    chrome.storage.local.get(["webData"], (result) => {
      let data = result.webData || {};
      data[currentTab] = (data[currentTab] || 0) + timeSpent;
      chrome.storage.local.set({ webData: data });
    });

    fetch("http://localhost:3000/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ website: currentTab, duration: timeSpent })
    });
  }
}