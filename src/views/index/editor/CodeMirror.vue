<template>
  <div>
    <h2>CodeMirror Output:</h2>
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script>
// https://www.jianshu.com/p/963fec25d957
import { basicSetup, minimalSetup, EditorView } from 'codemirror';
// import { history, historyKeymap } from '@codemirror/history';


import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
// import { EditorState, basicSetup } from "@codemirror/basic-setup";
// import { EditorView } from '@codemirror/view';

export default {
  data () {
    return {
      code: '',
      state: '',
      view:'',
    };
  },
  mounted () {
    // const state = EditorState.create({
    //   doc: 'function add(a, b) {\n  return a + b;\n}',
    //   extensions: [basicSetup, javascript()],
    // });
    // this.state = state
    // this.view = new EditorView({
    //   state,
    //   parent: this.$refs.editor,
    //   dispatch: this.dispatch,
    // });
    let myTheme = EditorView.theme({
      // 输入的字体颜色
      "&": {
        color: "#0052D9",
        backgroundColor: "#FFFFFF"
      },
      ".cm-content": {
        caretColor: "#0052D9",
      },
      // 激活背景色
      ".cm-activeLine": {
        backgroundColor: "#FAFAFA"
      },
      // 激活序列的背景色
      ".cm-activeLineGutter": {
        backgroundColor: "#FAFAFA"
      },
      //光标的颜色
      "&.cm-focused .cm-cursor": {
        borderLeftColor: "#000"
      },
      // 选中的状态
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#0052D9",
        color: '#FFFFFF'
      },
      // 左侧侧边栏的颜色
      ".cm-gutters": {
        backgroundColor: "#FFFFFF",
        color: "#ddd", //侧边栏文字颜色
        border: "none"
      }
    }, { dark: true })

    const state = EditorState.create({
      doc: 'function add(a, b) {\n  return a + b;\n}',
      extensions: [
        basicSetup, myTheme,
        // history(),
        // keymap.of([defaultTabBinding])
      ]
    });
    this.state = state

    const view = new EditorView({
      state,
      parent: this.$refs.editor,
      dispatch: this.dispatch,
    });
    this.view = view
  },
  methods: {
    dispatch (transaction) {
      // const newState = this.view.state.apply(transaction);
      // this.view.update([transaction]);
      // this.code = newState.doc.toString();
    },
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  min-height: 400px;
}
</style>