chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getTabTitle") {
      sendResponse({tabtitle: document.title});
    }
  });

const selector = 'h1[data-id="caseSubjectText"]';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getTicketTitle") {
    const element = document.querySelector(selector);
    sendResponse({tickettitle: element.dataset.title});
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "setTabTitleToTicketTitle") {
    const element = document.querySelector(selector);

    let title = element.dataset.title;
    const prefixRegex = /^\[.*?\]\s*/; // matches any string that starts with "[" and ends with "]"
    title = title.replace(prefixRegex, ''); // remove the matched prefix from title
    if (title.startsWith("WG: ")) {
      title = title.slice(4); // Remove "WG: "
    } else if (title.startsWith("RE: ")) {
      title = title.slice(4); // Remove "RE: "
    }

      document.title = title;
      sendResponse({success: true});
  }
});