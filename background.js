// written by juha

let selector = 'h1[data-id="caseSubjectText"]';
let TabTitle;
let TicketTitle;

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, title, tab) => {
        if (changeInfo.title) {
            chrome.tabs.sendMessage(tabId, {
                type: "getTabTitle"
            }, (response) => {
                if (response && response.tabtitle) {
                    TabTitle = response.tabtitle;
                    console.log("TabTitle: " + TabTitle);
                }
            })

            chrome.tabs.sendMessage(tabId, {
                type: "getTicketTitle"
            }, (response) => {
                if (response && response.tickettitle) {
                    TicketTitle = response.tickettitle;
                    console.log("TicketTitle: " + TicketTitle);
                }
            })

            if (TabTitle != TicketTitle) {
                chrome.tabs.sendMessage(tabId, {
                    type: "setTabTitleToTicketTitle"
                }, (response) => {
                    if (response && response.success) {
                        console.log("replaced Tab Name");
                    } else {
                        console.log("Respone of setTabTitleToTicketTitle is invalid");
                    }
                })
            }
        }
    });
});