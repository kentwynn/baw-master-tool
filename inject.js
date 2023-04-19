var paste_EditorToBAW = new BroadcastChannel('paste_EditorToBAW');
paste_EditorToBAW.onmessage = function (event) {
  pasteCodeEditorToBAW(event.data);
};

var save_EditorToBAW = new BroadcastChannel('save_EditorToBAW');
save_EditorToBAW.onmessage = function (event) {
  saveCodeEditorToBAW(event.data);
};

const pasteCodeEditorToBAW = (data) => {
  const { css, js, html } = data;
  const jsElement = document.querySelector(
    `[data-test-attr="inlineJavaScript.jseditor"]`
  );
  const jsID = jsElement.id;
  const cssElement = document.querySelector(
    `[data-test-attr="inlineCSS.jseditor"]`
  );
  const cssID = cssElement.id;
  dijit.byId(jsID).setValue(js);
  dijit.byId(jsID).onChange();
  dijit.byId(cssID).setValue(css);
  dijit.byId(cssID).onChange();
};

const saveCodeEditorToBAW = (data) => {
  const { css, js, html } = data;
  const jsElement = document.querySelector(
    `[data-test-attr="inlineJavaScript.jseditor"]`
  );
  const jsID = jsElement.id;
  const cssElement = document.querySelector(
    `[data-test-attr="inlineCSS.jseditor"]`
  );
  const cssID = cssElement.id;
  dijit.byId(jsID).setValue(js);
  dijit.byId(jsID).onChange();
  dijit.byId(jsID).saveAction();
  dijit.byId(cssID).setValue(css);
  dijit.byId(cssID).onChange();
  dijit.byId(cssID).saveAction();
};
