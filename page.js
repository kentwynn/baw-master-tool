chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'get_CoachViewModel') {
    try {
      getBAWCodeEditor();
    } catch (error) {
      throw error;
    }
  }
  if (request.action === 'get_UserInfo') {
    try {
      getUserInfo(request.value);
    } catch (error) {
      throw error;
    }
  }
  if (request.action === 'paste_EditorToBAW') {
    try {
      var broadcast = new BroadcastChannel('paste_EditorToBAW');
      broadcast.postMessage(request.value);
    } catch (error) {
      throw error;
    }
  }
  if (request.action === 'save_EditorToBAW') {
    try {
      var broadcast = new BroadcastChannel('save_EditorToBAW');
      broadcast.postMessage(request.value);
    } catch (error) {
      throw error;
    }
  }
});

const getBAWCodeEditor = () => {
  const params = new URLSearchParams(document.location.search);
  const containerRef = params.get('containerRef');
  fetch(
    `https://${window.location.host}/rest/bpm/wle/pd/v1/assets?containerRef=${containerRef}&avoidBasicAuthChallenge=true`,
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'en',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-ch-ua':
          '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
      },
      referrer: `https://${window.location.host}/WebPD/jsp/bootstrap.jsp?containerRef=${containerRef}&WorkflowCenter=/processapps/toolkits/localRepo?BAW=true&BAW_tWAS=true&filterBy=all&sortAsc=false&sortBy=recently_updated`,
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  )
    .then((result) => result.json())
    .then((result) => {
      var coachView = result.data.CoachView.items.find(
        (item) =>
          item.name ===
          document.querySelector(
            '#editorDropdown > tbody > tr > td.dijitReset.dijitStretch.dijitButtonContents > div.dijitReset.dijitInputField.dijitButtonText.editorDropDownLabel > span'
          ).textContent
      ).poId;

      fetch(
        `https://${window.location.host}/rest/bpm/wle/pd/v1/coachview/${coachView}?containerRef=${containerRef}&avoidBasicAuthChallenge=true`,
        {
          headers: {
            accept: 'application/json',
            'accept-language': 'en',
            'content-type': 'application/x-www-form-urlencoded',
            'sec-ch-ua':
              '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
          },
          referrer: `https://${window.location.host}/WebPD/jsp/bootstrap.jsp?containerRef=${containerRef}&WorkflowCenter=/processapps/toolkits/localRepo?BAW=true&BAW_tWAS=true&filterBy=all&sortAsc=false&sortBy=recently_updated`,
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        }
      )
        .then((res) => res.json())
        .then((result) => {
          chrome.runtime.sendMessage({
            type: 'get_CoachViewModel',
            value: result,
          });
        });
    });
};

const getUserInfo = (userName) => {
  fetch(
    `https://${window.location.host}/rest/bpm/wle/v1/user?userName=${userName}`,
    {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'sec-ch-ua':
          '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  )
    .then((response) => response?.text())
    .then((result) => {
      chrome.runtime.sendMessage({
        type: 'get_UserInfo',
        value: result,
      });
    });
};

function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  if (!document.getElementById('inject-script')) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    script.setAttribute('id', 'inject-script');
    node.appendChild(script);
  }
}
injectScript(chrome.runtime.getURL('inject.js'), 'body');
