<template>
  <div ref="codemirror" class="codemirror"></div>
</template>

<script lang="ts">
  import { EditorView, keymap } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { history, historyKeymap } from '@codemirror/history';
  import { standardKeymap, insertTab } from '@codemirror/commands';
  import { lineNumbers } from '@codemirror/gutter';
  import { sql, MySQL } from '@codemirror/lang-sql';
  import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
  import { autocompletion } from '@codemirror/autocomplete';
  import { ref, watch } from 'vue';
  // import { useStore } from 'vuex';
  // 数据库类型, 高度, 重载.(监听stroe,destory后create)
  //获取props
  export default {
    props: {
      sqlType: {
        required: true,
        type: String,
      },
      initHeight: {
        default: '300px',
        type: String,
      },
      initDoc: {
        default: '',
        type: String,
      },
      editable: {
        default: true,
        type: Boolean,
      },
    },
    setup(props) {
      const { state, mutations } = {
        state: {
          //mysql自动补全提示内容,key为表名,数组内为列名
          MYSQLContent: {
            apom: ['user', 'app_user', 'app_user_user'],
          },
        },
        mutations: {
          setMysqlTableContent(state, data) {
            state.MYSQLContent = { ...state.MYSQLContent, ...data };
          },
        }
      };

      let editorView = ref<EditorView>();
      const codemirror = ref(null);
      const sqlType = {
        [SqlType.MYSQL]: MySQL,
      };
      let startState;
      const createEditor = (editorContainer, doc) => {
        if (typeof editorView.value !== 'undefined') {
          editorView.value.destroy();
        }
        startState = EditorState.create({
          //doc为编辑器内容
          doc: doc,
          extensions: [
            history(),
            oneDarkTheme,
            keymap.of([
              ...standardKeymap,
              // ...historyKeymap,
              // Tab Keymap
              // {
              //   key: 'Tab',
              //   run: insertTab,
              // },
            ]),
            sql({
              dialect: sqlType[props.sqlType],
              schema: {
              apom: ['user', 'app_user', 'app_user_user'],
              }
            }),
            lineNumbers(),
            oneDarkHighlightStyle,
            autocompletion({ activateOnTyping: true }),
            EditorView.editable.of(props.editable),
          ],
        });
        editorView.value = new EditorView({
          state: startState,
          parent: editorContainer,
        });
      };
      //获取编辑器里的文本内容
      const getEditorDoc = (): string | null => {
        return (editorView.value as EditorView).state.doc.toString();
        // return (editorView.value as EditorView).contentDOM.textContent;
      };
      //监听对应sql的代码补全信息,如果更新,则重置editor
      watch(
        () => ({
            apom: ['user', 'app_user', 'app_user_user'],
          }),
        () => {
          let doc = (editorView.value as EditorView).state.doc.toString() ?? '';
          const editorContainer = codemirror.value;
          createEditor(editorContainer, doc);
        }
      );
      return {
        createEditor,
        getEditorDoc,
        editorView,
      };
    },
  mounted() {
    debugger;
      let doc = (this as any).$props.initDoc;
      const editorContainer = (this as any).$refs.codemirror;
      (this as any).createEditor(editorContainer, doc);
    },
    methods: {
      reloadEditor({ doc }) {
        //更新编辑器里的文档
        let text = (this as any).editorView.state.doc.toString();
        (this as any).editorView.dispatch({
          changes: { from: 0, to: text.length, insert: doc },
        });
      },
      formatEditorDoc() {
        let text = (this as any).editorView.state.doc.toString();
        let to = text.length;
        text = text.replaceAll(';', ';\r\n');
        let i = 0;
        let newText = '';
        let needNewLine = 50;
        while (i < text.length) {
          let modStr = text.substring(i);
          let namespace = modStr.indexOf(' ');
          let curText = modStr.substring(0, namespace + 1);

          if (newText.length - newText.lastIndexOf('\n') > needNewLine) {
            newText += curText + '\r\n';
          } else {
            newText += curText;
          }
          if (namespace === -1) {
            i = text.length + 1;
            newText += modStr;
          }
          i = namespace + i + 1;
        }

        (this as any).editorView.dispatch({
          changes: { from: 0, to: to, insert: newText },
        });
      },
    },
  };
</script>
<style>
  /* 这个$props没有写错,不要改 */
  .cm-editor {
    height: v-bind('$props.initHeight');
    font-size: 18px;
  }
</style>
<style lang="less" scoped></style>
