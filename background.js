const CONTEXT_MENU_ID = "MY_COPY_LINK";

async function copyLink(info, tab) {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }

  chrome.tabs.executeScript(null,
    {
      code: `
    const tags = document.getElementsByClassName("tag")
    console.log('tags=>', tags)
    const code = location.pathname.substring(3).slice(0, -1);
      const tagsVal = [code]
    for(let i = 0; i<tags.length; i++) {
    tagsVal.push(tags[i].children[0].innerHTML)
  }

  const readedVal = tagsVal.join("	") // Text to Copy
  console.log(readedVal)
  navigator.clipboard.writeText(readedVal)` });

}

chrome.contextMenus.create({
  title: "NH: Copy doujin code and tags",
  contexts: ["page"],
  id: CONTEXT_MENU_ID
});

chrome.contextMenus.onClicked.addListener(copyLink)

