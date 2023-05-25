let selector = 'h1[data-id="caseSubjectText"]';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getTabTitle") {
    sendResponse({ tabtitle: document.title });
  } else if (request.type === "getTicketTitle") {
    let element = document.querySelector(selector);
    sendResponse({ tickettitle: element ? element.dataset.title : "" });
  } else if (request.type === "setTabTitleToTicketTitle") {
    let element = document.querySelector(selector);

    if (element) {
      let title = element.dataset.title;
      let prefixRegex = /^\[.*?\]\s*/; // Migros, Lagermax
      title = title.replace(prefixRegex, "");
      if (title.startsWith("WG: ")) {
        title = title.slice(4);
      } else if (title.startsWith("RE: ")) {
        title = title.slice(4);
      } else if (title.startsWith("##")) {
        title = title.slice(9); // Evola
      }

      document.title = title;
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false });
    }
  }
});
