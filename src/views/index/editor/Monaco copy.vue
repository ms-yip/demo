<template>
  <div class="monaco">
    monaco editor
    <div ref="editContainer" class="code-editor"></div>
    createDiffEditor
    <el-button @click="">下一个</el-button>
    <div ref="createDiffEditor"  style="height: 200px"></div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, watch } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import {log} from './log'
// import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// // 解决vite Monaco提示错误
// self.MonacoEnvironment = {
//   getWorker () {
//     return new JsonWorker();
//   },
// };

// // script 标签中
// import { toRaw } from 'vue'
// const getVal = () => {
//   return toRaw(monacoEditor.value).getValue(); //获取编辑器中的文本
// }

// // this.monacoEditor.setValue(newValue)
// // editor.getSelection();  //获取选中的行信息

// // editor.getModel().getLineContent(1);    //获取某一行的内容
// // editor.getModel().getLinesContent();    //获取每一行的内容

// // monaco.editor.setTheme('vs-dark');      //设置主题

// // editor._configuration._rawOptions.language  //获取编辑器当前语言（初始化值）
// // editor.getModel().getLanguageId()           //动态（已改变编辑器语言）
// //改变属性
// editor.updateOptions({
//   //关闭行号
//   lineNumbers: "off"
// });

// //内容改变事件
// editor.onDidChangeModelContent(function (e) {
//   console.log(e);
//   console.log(editor.getValue());
// });

// //添加按键监听
// editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
//   console.log('Ctrl + S 保存')
// })

// editor.trigger('a', 'editor.action.formatDocument') //触发：格式化文档，更多支持项：editor._actions

// //渲染代码得到HTML
// monaco.editor.colorize('console.log("Hello world!");', 'javascript').then(function (data) {
//   console.log(data);
// });

// //渲染节点代码
// <pre id="code" data-lang="javascript" style="width:500px;">console.log("Hello world!");</pre>
// monaco.editor.colorizeElement(document.getElementById('code'));

export default {
  props: {
    value: String,
    language: {
      type: String,
      default: 'javaScript'
    }
  },
  setup (props, { emit }) {
    let monacoEditor = null;
    const { proxy } = getCurrentInstance();
    // 支持的语言
    console.log(monaco.languages.getLanguages())
    const languages = monaco.languages.getLanguages().map(i => i.id)
    console.log('languages', languages)
    watch(
      () => props.value,
      (value) => {
        // 防止改变编辑器内容时光标重定向
        if (value !== monacoEditor?.getValue()) {
          monacoEditor.setValue(value);
        }
      },
    );
    onMounted(() => {

      // 定义主题
      monaco.editor.defineTheme('demo-custom', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '#333333' }],
        colors: {
          'editor.background': '#000000',     //背景色
        }
      });
      // 设置主题
      monaco.editor.setTheme('demo-custom')

      //   
      monacoEditor = monaco.editor.create(proxy.$refs.editContainer, {
        value: props.value,
        readOnly: false,
        language: props.language,
        theme: 'demo-custom', //'vs-light', //'vs-dark',
        selectOnLineNumbers: true,
        renderSideBySide: false,
        editorOptions: {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          writeOnly: false,
          cursorStyle: "line", //光标样式
          automaticLayout: true, //自动布局
          glyphMargin: true, //字形边缘
          useTabStops: false,
          fontSize: 32, //字体大小
          autoIndent: true, //自动布局
          //quickSuggestionsDelay: 500,   //代码提示延时
        }
        // autoClosingBrackets: true, // 自动闭合括号
        // autoClosingOvertype: true, // 自动闭合括号或引号
        // autoClosingQuotes: true, //自动闭合引号
        // autoIndent: true, //自动缩进		
      });

      console.log('monacoEditor', monacoEditor)

      monacoEditor.setValue(log)

      // monaco.editor.setModelMarkers(monacoEditor.getModel(), 'owner', [
      //   {
      //     // startLineNumber,
      //     // startColumn,
      //     // endLineNumber,
      //     // endColumn,
      //     // message, // 提示文案
      //     severity: monaco.MarkerSeverity.Error, // 提示的类型
      //   },
      // ])


      // 监听值变化
      monacoEditor.onDidChangeModelContent(() => {
        const currenValue = monacoEditor?.getValue();
        emit('update:value', currenValue);
      });

      // const newModel = monaco.editor.createModel(
      //   `alert('hello');\nalert('hello');\nalert('hello');\nalert('hello');\nalert('hello')`,
      //   "javascript"
      // );
      // monacoEditor.setModel(newModel);


      // monaco.languages.registerCompletionItemProvider('javascript', {
      //   provideCompletionItems (model, position) {
      //     const textUntilPosition = model.getValueInRange({
      //       startLineNumber: position.lineNumber,
      //       startColumn: 1,
      //       endLineNumber: position.lineNumber,
      //       endColumn: position.column,
      //     });
      //     const createComplete = _textUntilPosition => {
      //       // 切割成数组
      //       const words = _textUntilPosition.split(' ');
      //       // 取当前输入值
      //       const activeStr = words[words.length - 1];
      //       return [{
      //         label: 'wq',
      //         kind: monaco.languages.CompletionItemKind.Keyword,
      //         documentation: 'wq',
      //         insertText: 'wq',
      //       }];
      //     };
      //     const suggestions = createComplete(textUntilPosition);
      //     return {
      //       suggestions: [{
      //         label: 'jack',
      //         kind: monaco.languages.CompletionItemKind.Keyword,
      //         documentation: 'jack',
      //         insertText: 'jack',
      //       }, {
      //         label: 'tom',
      //         kind: monaco.languages.CompletionItemKind.Keyword,
      //         documentation: 'tom',
      //         insertText: 'tom',
      //       }],
      //     };
      //   },
      // });

      var originalModel = monaco.editor.createModel("function add(a, b) {\n  return a + b;\n}heLLo world!function add(a, b) {\n  return a + b;\n}", "text/plain");
      var modifiedModel = monaco.editor.createModel("hello orlando!function add(a, b) {\n  return a + b;\n}", "text/plain");

      var diffEditor = monaco.editor.createDiffEditor(proxy.$refs.createDiffEditor);
      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
      });

      // The diff editor offers a navigator to jump between changes. Once the diff is computed the <em>next()</em> and <em>previous()</em> method allow navigation. By default setting the selection in the editor manually resets the navigation state.
      // 为编辑器创建一个模型，可以指定适用此模型的语言，也可以通过设置uri让其自己推断
      var originalModel = monaco.editor.createModel("just some text\n\nHello World\n\nSome more text", "text/plain");
      var modifiedModel = monaco.editor.createModel("just some Text\n\nHello World\n\nSome more changes", "text/plain");
     

      var diffEditor = monaco.editor.createDiffEditor(proxy.$refs.createDiffEditor);
      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
      });
      // ctrl + F 召唤 
      var navi = monaco.editor.createDiffNavigator(diffEditor, {
        followsCaret: true, // resets the navigator state when the user selects something in the editor
        ignoreCharChanges: true // jump from line to line
      });


      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        console.log('Ctrl + S 保存')
      })
      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Z, function () {
        monacoEditor.trigger.undo()
      })
      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Y, function () {
        monacoEditor.trigger.redo()
      })
 

      // window.setInterval(function () {
      //   navi.next();
      // }, 2000);
      // https://www.cnblogs.com/FuturexGO/p/12976656.html
      // https://juejin.cn/post/7218419207129415738
      // https://github.com/yuzai/base-editor

      // 编辑器的校验、编译配置
      // validation settings
      // monaco.languages.typescript.javascriptDefaults.setDiagnostics0ptions({
      //   noSemanticValidation: true,
      //   noSyntaValidation: true
      // })
      // // compiler options
      // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      //   target: monaco.languages.typescript.ScriptTarget.ES2017,
      //   strict: true,
      //   allowNonTsExtensions: true
      // })

      // // 设置主题
      // function themeChange (val) {
      //   monaco.editor.setTheme(val || 'vs')
      // }

      // // // 设置语言
      // function languageChange (val) {
      //   monaco.editor.setModelLanguage(this.editor.getModel(), val || 'javascript')
      // }

     

    });
    return {};
  },
};
</script>
<style scoped>
.code-editor {
  min-height: 200px;
  margin: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
