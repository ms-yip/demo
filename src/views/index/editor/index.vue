
<template>
  <div class="editor">
    <!-- <codemirror :sql-type="'MYSQL'" :init-doc="'select * from table;'" style="width:500px;height:500px;"></codemirror> -->


    <component :is="Monaco" :value="'function add(a, b) {\n  return a + b;\n}'"></component>


  </div>
</template>

<script setup lang="ts">
import codemirror from './CodeMirror.vue'
import Monaco from './Monaco.vue';
import { ref } from 'vue'

const editorType = ref(Monaco)
</script>
<style lang='scss' scoped>
// @import '';
 .editor{
 }
</style>
