// written by juha

let TabTitle;
let TicketTitle;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.title) {
    chrome.tabs.sendMessage(tabId, { type: "getTabTitle" }, (response) => {
      if (response && response.tabtitle) {
        TabTitle = response.tabtitle;
        console.log("TabTitle: " + TabTitle);
        compareTitles(tabId);
      }
    });

    chrome.tabs.sendMessage(tabId, { type: "getTicketTitle" }, (response) => {
      if (response && response.tickettitle) {
        TicketTitle = response.tickettitle;
        console.log("TicketTitle: " + TicketTitle);
        compareTitles(tabId);
      }
    });
  }
});

function compareTitles(tabId) {
  if (TabTitle && TicketTitle && TabTitle !== TicketTitle) {
    chrome.tabs.sendMessage(tabId, { type: "setTabTitleToTicketTitle" }, (response) => {
      if (response && response.success) {
        console.log("Replaced Tab Name");
      } else {
        console.log("Response of setTabTitleToTicketTitle is invalid");
      }
    });
  }
}
