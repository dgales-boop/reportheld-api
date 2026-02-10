document.addEventListener("DOMContentLoaded", () => {
  checkAPIHealth();

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(`${tabName}-tab`).classList.add("active");
    });
  });
});

async function checkAPIHealth() {
  const statusElement = document.getElementById("api-status");

  try {
    const response = await fetch("/health");
    const data = await response.json();

    if (data.status === "ok") {
      statusElement.textContent = "API Online";
      statusElement.style.color = "#10b981";
    } else {
      statusElement.textContent = "API Issues";
      statusElement.style.color = "#f59e0b";
    }
  } catch (error) {
    statusElement.textContent = "API Offline";
    statusElement.style.color = "#ef4444";
  }
}

async function fetchData(endpoint, responseElementId) {
  const responseElement = document.getElementById(responseElementId);

  responseElement.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    const formattedJSON = syntaxHighlight(JSON.stringify(data, null, 2));
    responseElement.innerHTML = `<pre>${formattedJSON}</pre>`;

    if (data.success === false) {
      responseElement.classList.add("error");
    } else {
      responseElement.classList.remove("error");
    }
  } catch (error) {
    const errorResponse = {
      success: false,
      error: {
        message: error.message,
        type: "FetchError",
        timestamp: new Date().toISOString(),
      },
    };

    const formattedError = syntaxHighlight(
      JSON.stringify(errorResponse, null, 2),
    );
    responseElement.innerHTML = `<pre class="error">${formattedError}</pre>`;
  }
}

function syntaxHighlight(json) {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "json-number";

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "json-key";
        } else {
          cls = "json-string";
        }
      } else if (/true|false/.test(match)) {
        cls = "json-boolean";
      } else if (/null/.test(match)) {
        cls = "json-null";
      }

      return '<span class="' + cls + '">' + match + "</span>";
    },
  );
}
