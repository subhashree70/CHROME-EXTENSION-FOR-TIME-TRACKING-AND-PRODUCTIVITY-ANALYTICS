etch("http://localhost:3000/api/weekly")
  .then(res => res.json())
  .then(data => {
    const report = document.getElementById("report");
    data.forEach(item => {
      const status = isProductive(item._id) ? "✅ Productive" : "❌ Unproductive";
      report.innerHTML += <p>${item._id}: ${Math.floor(item.total / 60)} mins - ${status}</p>;
    });
  });

function isProductive(site) {
  const productiveSites = ["stackoverflow.com", "github.com", "leetcode.com"];
  return productiveSites.includes(site);
}