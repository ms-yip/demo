export const tableOptions = {
  // border: true,
  // index: true,
  height: "auto",
  searchShowBtn: true,
  searchMenuPosition: 'left',
  column: [
    {
      label: "名称",
      prop: "name",
      align: "center",
      search: true,
      rules: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }]
    },
    {
      label: "描述",
      prop: "desc",
      align: "center",
    },
  ],
};
