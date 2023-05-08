<template>
  <div class="monaco">
    monaco editor
    <div ref="editContainer" class="code-editor"></div>

  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import { log } from './log'

  const props = defineProps( {
    value: String,
    language: {
      type: String,
      default: 'javaScript'
    }
  })



  let monacoEditor = ref();
  const instance = getCurrentInstance();
  const { proxy } = instance
  const emits = defineEmits(['update:value'])
  // 支持的语言
  console.log(monaco.languages.getLanguages())
  const languages = monaco.languages.getLanguages().map(i => i.id)
  console.log('languages', languages)



  function init() {
    console.log(proxy.$refs)

    monacoEditor.value = monaco.editor.create(proxy.$refs.editContainer, {
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
    monacoEditor.value.setValue(log)

  }


  onMounted(() => {
    init()
  })



</script>
<style scoped>
.code-editor {
  min-height: 200px;
  margin: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
