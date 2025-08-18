(function () {
  const { baseUrl, version, repoPath } = window.CDN_CONFIG;

  function loadScript(file) {
    const script = document.createElement("script");
    script.src = `${baseUrl}${version}${repoPath}${file}`;
    script.defer = true;
    document.head.appendChild(script);
  }

  // 1) Always load global script
  loadScript("glob.js");

  // 2) Load page-specific scripts if declared
  document.querySelectorAll("script[data-cdn-script]").forEach((el) => {
    const file = el.getAttribute("data-cdn-script");
    if (file) {
      loadScript(file);
    }
  });
})();
