document.addEventListener('DOMContentLoaded', function () {
  const loadMonaccoEditor = () => {
    require.config({
      paths: {
        vs: 'monaco-editor/0.37.1/min/vs',
      },
    });
    require(['vs/editor/editor.main'], function () {
      window.jsEditor = monaco.editor.create(
        document.getElementById('js-editor'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.cssEditor = monaco.editor.create(
        document.getElementById('css-editor'),
        {
          value: '',
          language: 'css',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.htmlEditor = monaco.editor.create(
        document.getElementById('html-editor'),
        {
          value: '',
          language: 'html',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.loadJsEditor = monaco.editor.create(
        document.getElementById('load-js-editor'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.unloadJsEditor = monaco.editor.create(
        document.getElementById('unload-js-editor'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.viewJsEditor = monaco.editor.create(
        document.getElementById('view-js-editor'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.changeJsEditor = monaco.editor.create(
        document.getElementById('change-js-editor'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.validateJsEditor = monaco.editor.create(
        document.getElementById('validate-js-editor'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.jsEditorPlayground = monaco.editor.create(
        document.getElementById('js-editor-playground'),
        {
          value: '',
          language: 'javascript',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.htmlEditorPlayground = monaco.editor.create(
        document.getElementById('html-editor-playground'),
        {
          value: '',
          language: 'html',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.cssEditorPlayground = monaco.editor.create(
        document.getElementById('css-editor-playground'),
        {
          value: '',
          language: 'css',
          automaticLayout: true,
          theme: 'vs-dark',
        }
      );
      window.jsonEditorUser = monaco.editor.create(
        document.getElementById('json-editor-user'),
        {
          value: '',
          language: 'json',
          automaticLayout: true,
          theme: 'vs-dark',
          readOnly: true,
        }
      );
      chrome.storage.local.get('js-editor-playground', function (result) {
        window.jsEditorPlayground
          .getModel()
          .setValue(result['js-editor-playground']);
      });
      chrome.storage.local.get('html-editor-playground', function (result) {
        window.htmlEditorPlayground
          .getModel()
          .setValue(result['html-editor-playground']);
      });
      chrome.storage.local.get('css-editor-playground', function (result) {
        window.cssEditorPlayground
          .getModel()
          .setValue(result['css-editor-playground']);
      });
      window.htmlEditorPlayground
        .getModel()
        .onDidChangeContent(onMonaccoPlaygroundChangeHandler);
      window.jsEditorPlayground
        .getModel()
        .onDidChangeContent(onMonaccoPlaygroundChangeHandler);
      window.cssEditorPlayground
        .getModel()
        .onDidChangeContent(onMonaccoPlaygroundChangeHandler);
      disableMonaccoBAW();
    });
  };
  loadMonaccoEditor();

  const onMonaccoPlaygroundChangeHandler = (e) => {
    // console.log(e);
    const jsEditorPlaygroundValue = window.jsEditorPlayground.getValue();
    chrome?.storage?.local?.set({
      'js-editor-playground': jsEditorPlaygroundValue,
    });
    const htmlEditorPlaygroundValue = window.htmlEditorPlayground.getValue();
    chrome?.storage?.local?.set({
      'html-editor-playground': htmlEditorPlaygroundValue,
    });
    const cssEditorPlaygroundValue = window.cssEditorPlayground.getValue();
    chrome?.storage?.local?.set({
      'css-editor-playground': cssEditorPlaygroundValue,
    });
  };

  const handleToggleEvent = () => {
    const btnElements = document.querySelectorAll('.btn-toggle');
    Array.from(btnElements).forEach((element) => {
      element.addEventListener('click', () => {
        const id = element.getAttribute('data-id');
        onToggle(id);
      });
    });
  };
  handleToggleEvent();

  const handleMonaccoEditorOnChangeEvent = () => {
    window?.jsEditor?.getModel().onDidChangeContent(onMonaccoChangeHander);
    window?.cssEditor?.getModel().onDidChangeContent(onMonaccoChangeHander);
    window?.htmlEditor?.getModel().onDidChangeContent(onMonaccoChangeHander);
    window?.loadJsEditor?.getModel().onDidChangeContent(onMonaccoChangeHander);
    window?.unloadJsEditor
      ?.getModel()
      .onDidChangeContent(onMonaccoChangeHander);
    window?.viewJsEditor?.getModel().onDidChangeContent(onMonaccoChangeHander);
    window?.changeJsEditor
      ?.getModel()
      .onDidChangeContent(onMonaccoChangeHander);
    window?.validateJsEditor
      ?.getModel()
      .onDidChangeContent(onMonaccoChangeHander);
  };

  const onMonaccoChangeHander = (e) => {
    // console.log(e);
    setTimeout(() => {
      let error = window.jsEditor._domElement.querySelector('.squiggly-error');
      error += window.cssEditor._domElement.querySelector('.squiggly-error');
      error += window.htmlEditor._domElement.querySelector('.squiggly-error');
      error += window.loadJsEditor._domElement.querySelector('.squiggly-error');
      error +=
        window.unloadJsEditor._domElement.querySelector('.squiggly-error');
      error += window.viewJsEditor._domElement.querySelector('.squiggly-error');
      error +=
        window.changeJsEditor._domElement.querySelector('.squiggly-error');
      error +=
        window.validateJsEditor._domElement.querySelector('.squiggly-error');
      const buttonPasteElement = document.getElementById('btn-paste-to-editor');
      const buttonSaveElement = document.getElementById('btn-save-to-editor');
      if (error) {
        buttonPasteElement.classList.add('opacity-30', 'cursor-not-allowed');
        buttonSaveElement.classList.add('opacity-30', 'cursor-not-allowed');
      } else {
        buttonPasteElement.classList.remove('opacity-30', 'cursor-not-allowed');
        buttonSaveElement.classList.remove('opacity-30', 'cursor-not-allowed');
      }
    }, 1200);
  };

  const onToggle = (id) => {
    const btnElements = document.querySelectorAll('.btn-toggle');
    Array.from(btnElements).forEach((element) => {
      element.classList.remove('active');
    });

    const elements = document.querySelectorAll('.editor');
    Array.from(elements).forEach((element) => {
      element.classList.add('hidden');
    });

    const btnElement = document.querySelector(`[data-id="${id}"]`);
    const element = document.querySelector('#' + id + '-container');
    btnElement.classList.add('active');
    element.classList.remove('hidden');
  };

  const handleUserMessage = (request, sender, sendResponse) => {
    if (request.type === 'get_CoachViewModel') {
      const receivedValue = request?.value;
      // console.log(receivedValue);
      if (receivedValue?.data && receivedValue.status === '200') {
        enableMonaccoBAW();
        const { CoachViewModel } = receivedValue?.data;
        const { inlineScript, header } = CoachViewModel;
        setValuesToMonaccoEditor(inlineScript);
        setValuesOfEventHandlersToMonaccoEditor(header);
        handleMonaccoEditorOnChangeEvent();
      } else {
        disableMonaccoBAW();
      }
    }
    if (request.type === 'get_UserInfo') {
      const receivedValue = request?.value;
      const xmlElement = new DOMParser().parseFromString(
        receivedValue,
        'text/xml'
      );
      const userID = xmlElement.querySelector('userID')?.textContent;
      const userName = xmlElement.querySelector('userName')?.textContent;
      const fullName = xmlElement.querySelector('fullName')?.textContent;
      const isDisabled = xmlElement.querySelector('isDisabled')?.textContent;
      const emailAddress =
        xmlElement.querySelector('emailAddress')?.textContent;
      document.getElementById('userid-td').innerText = userID;
      document.getElementById('username-td').innerText = userName;
      document.getElementById('fullname-td').innerText = fullName;
      document.getElementById('emailaddress-td').innerText = emailAddress;
      switch (isDisabled) {
        case 'false':
          document
            .getElementById('userstatus-enable-td')
            .classList.remove('hidden');
          document
            .getElementById('userstatus-disable-td')
            .classList.add('hidden');
          document
            .getElementById('userstatus-undefine-td')
            .classList.add('hidden');
          break;
        case 'true':
          document
            .getElementById('userstatus-enable-td')
            .classList.add('hidden');
          document
            .getElementById('userstatus-disable-td')
            .classList.remove('hidden');
          document
            .getElementById('userstatus-undefine-td')
            .classList.add('hidden');
          break;
        default:
          document
            .getElementById('userstatus-enable-td')
            .classList.add('hidden');
          document
            .getElementById('userstatus-disable-td')
            .classList.add('hidden');
          document
            .getElementById('userstatus-undefine-td')
            .classList.remove('hidden');
          break;
      }
    }
  };

  const disableMonaccoBAW = () => {
    const buttonPasteElement = document.getElementById('btn-paste-to-editor');
    const buttonSaveElement = document.getElementById('btn-save-to-editor');
    buttonPasteElement.classList.add('opacity-30', 'cursor-not-allowed');
    buttonSaveElement.classList.add('opacity-30', 'cursor-not-allowed');
    document.getElementById('alert-border').classList.remove('hidden');
    document.getElementById('alert-border-text').innerText =
      'Cannot fetch API from BAW Server. Please try again later!';
    window.jsEditor?.updateOptions({ readOnly: true });
    window.cssEditor?.updateOptions({ readOnly: true });
    window.htmlEditor?.updateOptions({ readOnly: true });
    document.getElementById('js-editor-action').classList.remove('hidden');
    document.getElementById('css-editor-action').classList.remove('hidden');
    document.getElementById('html-editor-action').classList.remove('hidden');
    disableMonaccoBAWEventHandlers();
  };

  const disableMonaccoBAWEventHandlers = () => {
    window.loadJsEditor?.updateOptions({ readOnly: true });
    window.unloadJsEditor?.updateOptions({ readOnly: true });
    window.viewJsEditor?.updateOptions({ readOnly: true });
    window.changeJsEditor?.updateOptions({ readOnly: true });
    window.validateJsEditor?.updateOptions({ readOnly: true });
    document.getElementById('load-js-editor-action').classList.remove('hidden');
    document
      .getElementById('unload-js-editor-action')
      .classList.remove('hidden');
    document.getElementById('view-js-editor-action').classList.remove('hidden');
    document
      .getElementById('change-js-editor-action')
      .classList.remove('hidden');
    document
      .getElementById('validate-js-editor-action')
      .classList.remove('hidden');
  };

  const enableMonaccoBAW = () => {
    const buttonPasteElement = document.getElementById('btn-paste-to-editor');
    const buttonSaveElement = document.getElementById('btn-save-to-editor');
    buttonPasteElement.classList.remove('opacity-30', 'cursor-not-allowed');
    buttonSaveElement.classList.remove('opacity-30', 'cursor-not-allowed');
    document.getElementById('alert-border').classList.add('hidden');
    document.getElementById('alert-border-text').innerText =
      'Cannot fetch API from BAW Server. Please try again later!';
    window.jsEditor?.updateOptions({ readOnly: false });
    window.cssEditor?.updateOptions({ readOnly: false });
    window.htmlEditor?.updateOptions({ readOnly: false });
    document.getElementById('js-editor-action').classList.add('hidden');
    document.getElementById('css-editor-action').classList.add('hidden');
    document.getElementById('html-editor-action').classList.add('hidden');
    // enableMonaccoBAWEventHandlers();
  };

  const enableMonaccoBAWEventHandlers = () => {
    window.loadJsEditor?.updateOptions({ readOnly: false });
    window.unloadJsEditor?.updateOptions({ readOnly: false });
    window.viewJsEditor?.updateOptions({ readOnly: false });
    window.changeJsEditor?.updateOptions({ readOnly: false });
    window.validateJsEditor?.updateOptions({ readOnly: false });
    document.getElementById('load-js-editor-action').classList.add('hidden');
    document.getElementById('unload-js-editor-action').classList.add('hidden');
    document.getElementById('view-js-editor-action').classList.add('hidden');
    document.getElementById('change-js-editor-action').classList.add('hidden');
    document
      .getElementById('validate-js-editor-action')
      .classList.add('hidden');
  };

  const setValuesToMonaccoEditor = (inlineScript = []) => {
    const inlineCSS = inlineScript.find(
      (item) => item.name === 'Inline CSS' && item.scriptType === 'CSS'
    );
    const inlineJS = inlineScript.find(
      (item) => item.name === 'Inline Javascript' && item.scriptType === 'JS'
    );
    const headerHTML = inlineScript.find(
      (item) => item.name === 'Header HTML' && item.scriptType === 'HTML'
    );
    inlineJS?.scriptBlock
      ? window?.jsEditor?.getModel()?.setValue(inlineJS?.scriptBlock)
      : null;
    inlineCSS?.scriptBlock
      ? window?.cssEditor?.getModel()?.setValue(inlineCSS?.scriptBlock)
      : null;
    headerHTML?.scriptBlock
      ? window?.htmlEditor?.getModel()?.setValue(headerHTML?.scriptBlock)
      : null;
  };

  const setValuesOfEventHandlersToMonaccoEditor = (header) => {
    if (header['loadJSFunction'])
      window?.loadJsEditor?.getModel()?.setValue(header['loadJSFunction']);
    if (header['unloadJSFunction'])
      window?.unloadJsEditor?.getModel()?.setValue(header['unloadJSFunction']);
    if (header['viewJSFunction'])
      window?.viewJsEditor?.getModel()?.setValue(header['viewJSFunction']);
    if (header['changeJSFunction'])
      window?.changeJsEditor?.getModel()?.setValue(header['changeJSFunction']);
    if (header['validateJSFunction'])
      window?.validateJsEditor
        ?.getModel()
        ?.setValue(header['validateJSFunction']);
  };

  chrome.runtime.onMessage.addListener(handleUserMessage);
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      window.tabId = tabs[0].id;
      chrome.tabs.sendMessage(window.tabId, {
        action: 'get_CoachViewModel',
        value: null,
      });
    }
  );

  const onSetEditorToBAWHandler = () => {
    const buttonPasteElement = document.getElementById('btn-paste-to-editor');
    buttonPasteElement.addEventListener('click', () => {
      chrome.tabs.sendMessage(window.tabId, {
        action: 'paste_EditorToBAW',
        value: getMonaccoEditorValue(),
      });
    });

    const buttonSaveElement = document.getElementById('btn-save-to-editor');
    buttonSaveElement.addEventListener('click', () => {
      chrome.tabs.sendMessage(window.tabId, {
        action: 'save_EditorToBAW',
        value: getMonaccoEditorValue(),
      });
    });
  };
  onSetEditorToBAWHandler();

  const getMonaccoEditorValue = () => {
    const js = window.jsEditor.getValue();
    const css = window.cssEditor.getValue();
    const html = window.htmlEditor.getValue();
    const loadJsEditor = window.loadJsEditor.getValue();
    const unloadJsEditor = window.unloadJsEditor.getValue();
    const viewJsEditor = window.viewJsEditor.getValue();
    const changeJsEditor = window.changeJsEditor.getValue();
    const validateJsEditor = window.validateJsEditor.getValue();
    return {
      js,
      css,
      html,
      loadJsEditor,
      unloadJsEditor,
      viewJsEditor,
      changeJsEditor,
      validateJsEditor,
    };
  };

  const onGetUserInfoHandler = () => {
    const btnGetUser = document.getElementById('btn-get-user');
    const inputUserName = document.getElementById('username-input');
    btnGetUser.addEventListener('click', (e) => {
      const inputValue = inputUserName.value;
      if (inputValue) {
        chrome.tabs.sendMessage(window.tabId, {
          action: 'get_UserInfo',
          value: inputValue,
        });
      }
    });
  };
  onGetUserInfoHandler();
});
