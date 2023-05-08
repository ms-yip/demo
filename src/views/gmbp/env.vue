<template>
  <div class="environment">
    <avue-crud ref="crud" :data="data" :option="option" :page="page"></avue-crud>
  </div>
</template>
：
<script setup lang="ts">
import { ref } from "vue";
import { tableOptions } from "@/views/gmbp/const/environment";
import { page_default } from "@/views/gmbp/const/default";

const data = ref([]);
const option = ref(tableOptions);
const page = ref(page_default);




</script>
<style lang="scss" scoped></style>
