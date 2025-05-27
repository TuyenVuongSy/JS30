function updateFirstTitle() {
  const firstTitle = document.querySelector("h3.article-title a");

  if (firstTitle) {
    firstTitle.textContent = "Sinh viên UDU top 1 server Hoàng Quốc Việt";
    console.log("Đã thay tiêu đề đầu tiên");
  } else {
    console.log("Không tìm thấy tiêu đề đầu tiên");
  }
}
const observer = new MutationObserver((mutations, obs) => {
  const firstTitle = document.querySelector("h3.article-title a");
  if (firstTitle) {
    updateFirstTitle();
    obs.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});