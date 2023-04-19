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
  };

  const onMonaccoChangeHander = (e) => {
    // console.log(e);
    setTimeout(() => {
      let error = window.jsEditor._domElement.querySelector('.squiggly-error');
      error += window.cssEditor._domElement.querySelector('.squiggly-error');
      error += window.htmlEditor._domElement.querySelector('.squiggly-error');
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
    const element = document.querySelector('#' + id);
    btnElement.classList.add('active');
    element.classList.remove('hidden');
  };

  const handleUserMessage = (request, sender, sendResponse) => {
    if (request.type === 'get_CoachViewModel') {
      const receivedValue = request?.value;
      // console.log(receivedValue);
      if (receivedValue?.data && receivedValue.status === '200') {
        document.getElementById('alert-border').classList.add('hidden');
        const { CoachViewModel } = receivedValue?.data;
        const { inlineScript } = CoachViewModel;
        setValuesToMonaccoEditor(inlineScript);
        handleMonaccoEditorOnChangeEvent();
      } else {
        document.getElementById('alert-border').classList.remove('hidden');
        document.getElementById('alert-border-text').innerText =
          'Cannot fetch API from BAW Server. Please try again later!';
      }
    };
  };

  const setValuesToMonaccoEditor = (inlineScript = []) => {
    const inlineCSS = inlineScript.find(
      (item) => item.name === 'Inline CSS' && item.scriptType === 'CSS'
    );
    const inlineJS = inlineScript.find(
      (item) => item.name === 'Inline Javascript' && item.scriptType === 'JS'
    );
    inlineJS?.scriptBlock
      ? window?.jsEditor?.getModel()?.setValue(inlineJS?.scriptBlock)
      : null;
    inlineCSS?.scriptBlock
      ? window?.cssEditor?.getModel()?.setValue(inlineCSS?.scriptBlock)
      : null;
  };

  chrome.runtime.onMessage.addListener(handleUserMessage);

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      document.getElementById('alert-border').classList.remove('hidden');
        document.getElementById('alert-border-text').innerText =
          'Cannot connect to BAW Server. Please try again later!';
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
    return {
      js,
      css,
      html,
    };
  };
});
