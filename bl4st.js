// basicSetup imports
import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
        rectangularSelection, crosshairCursor,
        lineNumbers, highlightActiveLineGutter} from "@codemirror/view"
import {EditorState} from "@codemirror/state"
import {defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
        foldGutter, foldKeymap} from "@codemirror/language"
import {defaultKeymap, history, historyKeymap} from "@codemirror/commands"
import {searchKeymap, highlightSelectionMatches} from "@codemirror/search"
import {autocompletion, completionKeymap} from "@codemirror/autocomplete"
import {lintKeymap} from "@codemirror/lint"

// Actual imports
import {EditorView} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
import {javascript} from "@codemirror/lang-javascript"
import { nord } from 'cm6-theme-nord'
import { vim, Vim, getCM } from "@replit/codemirror-vim"
import { linter } from "@codemirror/lint";

const engine = new Engine()
engine.init()

let errors = [];
function errorLint(view) {
  return errors.map(error => {
    return {
      from: 0,
      to: view.state.doc.length,
      severity: "error",
      message: error.toString(),
    }
  });
}

function evalCode(code, view) {
  try {
      const config = eval(code);
      engine.setConfig(config)
  } catch (err) {
    errors = [err];
    console.error(err);
    // trigger review of the error
    view?.setState(view?.state);
    return true;
  }
  params.set("c", code);
  window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
  errors = [];
  // trigger review to clear errors
  view?.setState(view?.state);
  return true;
}

const params = new URLSearchParams(location.search);
let defaultCode = `flame()
  .addTransform(
    transform()
    .linear()
    .weight(0.35)
    .wvar(0.7)
    .x(({time}) => [Math.sin(time)+1, Math.cos(time)+1])
    .y([-0.1303464, 0.361507])
    .o([0.625, 0])
    .build()
  )
  .addTransform(
    transform()
    .linear()
    .weight(0.35)
    .wvar(1)
    .x([0.5003027, 0.8662202])
    .y([-0.8662202, 0.5003027])
    .build()
  )
  .addTransform(
    transform()
    .linear()
    .weight(0.85)
    .wvar(0.9)
    .x([0.08563109, 0.7551379])
    .y([-0.7551379, 0.08563109])
    .build()
  )
  .mapExposure(2.4)
  .colorful(0.8323)
  .texScale(1)
  .firstLevel(7)
  .lastLevel(10)
  .screenInitVal(2.4)
  .screenInitScale(0.09)
  .iterations(3)
  .view([.8, .8, 0, 0])
`
if (params.get("c")) {
  defaultCode = params.get("c");
}
let vimExtension = [];
if (params.get("v") !== null) {
  vimExtension = [vim()];
}

export const basicSetup = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
  bracketMatching(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
]

const editorDiv = document.getElementById("editor")
const runCode = (view) => evalCode(view.state.doc.toString(), view)
const editor = new EditorView({
  doc: defaultCode,
  extensions: [
    keymap.of([{
      key: "Ctrl-Enter",
      run: runCode,
    },{
      key: "Cmd-Enter",
      run: runCode
    },{
      key: "Ctrl-e",
      run: (view) => {
        let cm = getCM(view);
        Vim.exitInsertMode(cm);
        return true;
      }
    }]),
    keymap.of(defaultKeymap),
    keymap.of([indentWithTab]),
    javascript(),
    basicSetup,
    EditorView.lineWrapping,
    nord,
    linter(errorLint),
  ].concat(vimExtension),
  parent: editorDiv,
});

setTimeout(() => {
    evalCode(defaultCode, editor)
    engine.render()
}, 10);

function runButtonFn() {
  evalCode(editor.state.doc.toString(), editor);
}
const runButton = document.getElementById("runButton");
runButton.onclick = runButtonFn

Vim.defineEx('write', 'w', function() {
  evalCode(editor.state.doc.toString(), editor);
});
