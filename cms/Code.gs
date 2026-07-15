/**
 * Apps Script připojený k redakční tabulce.
 * V Project Settings vytvořte Script Property NETLIFY_BUILD_HOOK.
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Web Janata').addItem('Publikovat web', 'publishWebsite').addToUi();
}

function publishWebsite() {
  const hook = PropertiesService.getScriptProperties().getProperty('NETLIFY_BUILD_HOOK');
  if (!hook || !/^https:\/\/api\.netlify\.com\/build_hooks\//.test(hook)) {
    SpreadsheetApp.getUi().alert('Nejprve nastavte Script Property NETLIFY_BUILD_HOOK.');
    return;
  }
  const response = UrlFetchApp.fetch(hook, { method: 'post', muteHttpExceptions: true });
  if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) {
    SpreadsheetApp.getUi().alert('Publikování se nepodařilo spustit. Zkontrolujte Netlify build hook.');
    return;
  }
  SpreadsheetApp.getUi().alert('Nová verze webu se připravuje. Obvykle bude dostupná během několika minut.');
}
