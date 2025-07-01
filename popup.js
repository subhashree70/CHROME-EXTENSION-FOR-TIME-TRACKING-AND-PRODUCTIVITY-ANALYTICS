chrome.storage.local.get("webData", data => {
  const out = document.getElementById("output");
  for (const [site, seconds] of Object.entries(data.webData || {})) {
    out.innerHTML += <p>${site}: ${Math.floor(seconds / 60)} min</p>;
  }
});