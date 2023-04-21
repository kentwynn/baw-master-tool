var paste_EditorToBAW = new BroadcastChannel('paste_EditorToBAW');
paste_EditorToBAW.onmessage = function (event) {
  pasteCodeEditorToBAW(event.data);
};

var save_EditorToBAW = new BroadcastChannel('save_EditorToBAW');
save_EditorToBAW.onmessage = function (event) {
  saveCodeEditorToBAW(event.data);
};

const pasteCodeEditorToBAW = (data) => {
  debugger;
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
  dijit.byId(jsID).setValue(js);
  dijit.byId(jsID).onChange();
  dijit.byId(cssID).setValue(css);
  dijit.byId(cssID).onChange();
  dijit.byId(htmlID).setValue(html);
  dijit.byId(htmlID).onChange();
  // dijit.byId(loadJsID).setValue(loadJsEditor);
  // dijit.byId(loadJsID).onChange();
  // dijit.byId(unloadJsID).setValue(unloadJsEditor);
  // dijit.byId(unloadJsID).onChange();
//   dijit.byId(viewJsID).setValue(viewJsEditor);
//   dijit.byId(viewJsID).onChange();
//   dijit.byId(changeJsID).setValue(changeJsEditor);
//   dijit.byId(changeJsID).onChange();
//   dijit.byId(validateJsID).setValue(validateJsEditor);
//   dijit.byId(validateJsID).onChange();
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

  dijit.byId(jsID).setValue(js);
  dijit.byId(jsID).onChange();
  dijit.byId(jsID).saveAction();

  dijit.byId(cssID).setValue(css);
  dijit.byId(cssID).onChange();
  dijit.byId(cssID).saveAction();

  dijit.byId(htmlID).setValue(html);
  dijit.byId(htmlID).onChange();
  dijit.byId(htmlID).saveAction();

  // dijit.byId(loadJsID).setValue(loadJsEditor);
  // dijit.byId(loadJsID).onChange();
  // dijit.byId(loadJsID).saveAction();

  // dijit.byId(unloadJsID).setValue(unloadJsEditor);
  // dijit.byId(unloadJsID).onChange();
  // dijit.byId(unloadJsID).saveAction();

  // dijit.byId(viewJsID).setValue(viewJsEditor);
  // dijit.byId(viewJsID).onChange();
  // dijit.byId(viewJsID).saveAction();

  // dijit.byId(changeJsID).setValue(changeJsEditor);
  // dijit.byId(changeJsID).onChange();
  // dijit.byId(changeJsID).saveAction();

  // dijit.byId(validateJsID).setValue(validateJsEditor);
  // dijit.byId(validateJsID).onChange();
  // dijit.byId(validateJsID).saveAction();

};
