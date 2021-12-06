export default {
  routes: [
    {
      "path": "contractManage",
      "name": "合同管理",
      "meta": {
        "icon": "ams-icon-system-icon"
      },
      "children": [
        {
          "name": "合同归档",
          "path": "contractArchive",
          "block": "contractArchive"
        }
      ]
    },
    {
      "path": "invoiceManage",
      "name": "发票管理",
      "block": "invoiceManage",
      "meta": {
        "icon": "ams-icon-brand-equity",
        "hasMenu": true,
        "hidden": false,
        "noRedirect": false
      }
    },
    {
      "name": "新增申请",
      "path": "invoiceManageApply",
      "block": "invoiceManageApply",
      "meta": {
        "icon": "el-icon-setting",
        "hasMenu": true,
        "hidden": true,
        "noRedirect": false
      }
    },
    {
      "path": "setting",
      "name": "基础设置",
      "block": "setting",
      "meta": {
        "icon": "el-icon-setting",
        "hasMenu": true,
        "hidden": false,
        "noRedirect": false
      }
    }
  ] 
}