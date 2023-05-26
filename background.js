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

  chrome.tabs.sendMessage(tabId, { type: "getPriorityValue" }, (response) => {
    if (response && response.priorityValue) {
      let priorityValue = response.priorityValue;
      setTabIcon(tabId, priorityValue);
    }
  });
}

function setTabIcon(tabId, priorityValue) {
  let iconPath;

  if (priorityValue === "high") {
    iconPath = "path/to/high-icon.png";
  } else if (priorityValue === "medium") {
    iconPath = "path/to/medium-icon.png";
  } else if (priorityValue === "low") {
    iconPath = "path/to/low-icon.png";
  } else {
    iconPath = "path/to/default-icon.png";
  }

  chrome.tabs.setIcon(tabId, { path: iconPath }, () => {
    console.log("Tab icon set");
  });
}
