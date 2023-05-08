export const tableOptions = {
  // // border: true,
  // // index: true,
  // height: "auto",
  // searchShowBtn: true,
  // searchMenuPosition: 'left',
  column: [
    {
      label: "系统名",
      prop: "name",
      align: "center",
      search: true,
      rules: [{
        required: true,
        message: '请输入系统名',
        trigger: 'blur'
      }]
    },
    {
      label: "系统码",
      prop: "name",
      align: "center",
      search: true,
      rules: [{
        required: true,
        message: '请输入系统码',
        trigger: 'blur'
      }]
    },
     {
      label:"分类",
      prop: "name",
      align: "center",
      search: true,
      rules: [{
        required: true,
        message: '请选择',
        trigger: 'blur'
      }]
    },
     {
      label:"分类",
      prop: "name",
      align: "center",
      search: true,
    },
  ],
};
