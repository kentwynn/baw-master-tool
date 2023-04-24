var paste_EditorToBAW = new BroadcastChannel('paste_EditorToBAW');
paste_EditorToBAW.onmessage = function (event) {
  pasteCodeEditorToBAW(event.data);
};

var save_EditorToBAW = new BroadcastChannel('save_EditorToBAW');
save_EditorToBAW.onmessage = function (event) {
  saveCodeEditorToBAW(event.data);
};

const pasteCodeEditorToBAW = (data) => {
  const {
    js,
    css,
    html,
    loadJsEditor,
    unloadJsEditor,
    viewJsEditor,
    changeJsEditor,
    validateJsEditor,
  } = data;
  const jsElement = document.querySelector(
    `[data-test-attr="inlineJavaScript.jseditor"]`
  );
  const jsID = jsElement.id;

  const cssElement = document.querySelector(
    `[data-test-attr="inlineCSS.jseditor"]`
  );
  const cssID = cssElement.id;

  const htmlElement = document.querySelector(
    `[data-test-attr="headerHTML.multiTextField"]`
  );
  const htmlID = htmlElement.id;

  const loadJsElement = document.querySelector(
    `[data-test-attr="eventHandlersLoad.jseditor"]`
  );
  const loadJsID = loadJsElement.id;

  const unloadJsElement = document.querySelector(
    `[data-test-attr="eventHandlersUnload.jseditor"]`
  );
  const unloadJsID = unloadJsElement.id;

  const viewJsElement = document.querySelector(
    `[data-test-attr="eventHandlersView.jseditor"]`
  );
  const viewJsID = viewJsElement.id;

  const changeJsElement = document.querySelector(
    `[data-test-attr="eventHandlersChange.jseditor"]`
  );
  const changeJsID = changeJsElement.id;

  const validateJsElement = document.querySelector(
    `[data-test-attr="eventHandlersValidate.jseditor"]`
  );
  const validateJsID = validateJsElement.id;
  const queue = [];
  queue.push(queueOnFunction(jsID, js));
  queue.push(queueOnFunction(cssID, css));
  queue.push(queueOnFunction(htmlID, html));
  // queue.push(queueOnFunction(loadJsID, loadJsEditor));
  // queue.push(queueOnFunction(unloadJsID, unloadJsEditor));
  // queue.push(queueOnFunction(viewJsID, viewJsEditor));
  // queue.push(queueOnFunction(changeJsID, changeJsEditor));
  // queue.push(queueOnFunction(validateJsID, validateJsEditor));
  while (queue.length > 0) {
    queue.shift();
  }
};

const saveCodeEditorToBAW = (data) => {
  const {
    js,
    css,
    html,
    loadJsEditor,
    unloadJsEditor,
    viewJsEditor,
    changeJsEditor,
    validateJsEditor,
  } = data;
  const jsElement = document.querySelector(
    `[data-test-attr="inlineJavaScript.jseditor"]`
  );
  const jsID = jsElement.id;

  const cssElement = document.querySelector(
    `[data-test-attr="inlineCSS.jseditor"]`
  );
  const cssID = cssElement.id;

  const htmlElement = document.querySelector(
    `[data-test-attr="headerHTML.multiTextField"]`
  );
  const htmlID = htmlElement.id;

  const loadJsElement = document.querySelector(
    `[data-test-attr="eventHandlersLoad.jseditor"]`
  );
  const loadJsID = loadJsElement.id;

  const unloadJsElement = document.querySelector(
    `[data-test-attr="eventHandlersUnload.jseditor"]`
  );
  const unloadJsID = unloadJsElement.id;

  const viewJsElement = document.querySelector(
    `[data-test-attr="eventHandlersView.jseditor"]`
  );
  const viewJsID = viewJsElement.id;

  const changeJsElement = document.querySelector(
    `[data-test-attr="eventHandlersChange.jseditor"]`
  );
  const changeJsID = changeJsElement.id;

  const validateJsElement = document.querySelector(
    `[data-test-attr="eventHandlersValidate.jseditor"]`
  );
  const validateJsID = validateJsElement.id;
  const queue = [];
  queue.push(queueOnFunction(jsID, js, true));
  queue.push(queueOnFunction(cssID, css, true));
  queue.push(queueOnFunction(htmlID, html, true));
  // queue.push(queueOnFunction(loadJsID, loadJsEditor, true));
  // queue.push(queueOnFunction(unloadJsID, unloadJsEditor, true));
  // queue.push(queueOnFunction(viewJsID, viewJsEditor, true));
  // queue.push(queueOnFunction(changeJsID, changeJsEditor, true));
  // queue.push(queueOnFunction(validateJsID, validateJsEditor, true));
  while (queue.length > 0) {
    queue.shift();
  }
};

const queueOnFunction = (id, value, isSaveAction = false) => {
  dijit.byId(id).setValue(value);
  dijit.byId(id).onChange();
  if (isSaveAction) dijit.byId(id).saveAction();
};
