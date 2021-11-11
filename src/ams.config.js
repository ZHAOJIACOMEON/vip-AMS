import ams from "@ams-team/ams";

ams.block('template-block', {
  "resources": {
    requestInterceptor(options) {
      options.headers = {
        "xsrf-token": "token",
      }
      return options
    },
    "api": {
        "withCredentials": true,
        "contentType": 'json',
        "successCode": 0
    }
  },
  "blocks": {
    "routerBlock1": {
      "router": {
        "defaultBreadcrumb": true,
        "routes": [
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
      },
      "blocks": {
        "contractArchive": {
          "type": "component",
          "blocks": {
            "searchFormComponent": {
              "type": "form",
              "props": {
                "inline": true
              },
              "resource": {
                "fields": {
                  "contractNumber": {
                    "label": "合同编号",
                    "type": "text",
                    "default": "请输入合同编号"
                  },
                  "contractName": {
                    "label": "合同名称",
                    "type": "text",
                    "default": "请输入合同名称"
                  },
                  "date": {
                    "type": "date",
                    "label": "签订日期",
                    "default": "请输入签订日期"
                  }
                }
              },
              "ctx": "edit",
              "operations": {
                "searchMoreConditionResultButton": {
                  "type": "button",
                  "label": "更多条件》",
                  "props": {
                    "type": "text"
                  }
                },
                "searchResultButton": {
                  "type": "button",
                  "label": "查询",
                  "props": {
                    "type": "primary"
                  }
                },
                "importButton": {
                  "type": "button",
                  "label": "初始化导入",
                  "props": {
                    "type": "primary"
                  }
                }
              },
              "actions": {
                "searchResultButton": function() {
                  this.$message("你点击了查询")
                },
                "searchMoreConditionResultButton": function() {
                  this.$message("你点击了更多条件》")
                },
                "importButton": function() {
                  this.$message("你点击了初始化导入")
                }
              },
              "blocks": {
                "contractListComponent": {
                  "type": "list",
                  "resource": {
                    "fields": {
                      "archiveType": {
                        "label": "归档状态",
                        "type": "text"
                      },
                      "contractType": {
                        "label": "合同状态",
                        "type": "text"
                      },
                      "company": {
                        "label": "所属公司",
                        "type": "text"
                      },
                      "part": {
                        "label": "所属部门",
                        "type": "text"
                      },
                      "contractNumber": {
                        "label": "合同编号",
                        "type": "text"
                      },
                      "contractName": {
                        "label": "合同名称",
                        "type": "text"
                      },
                    },
                    "api": {
                      "prefix": "http://rap2api.taobao.org/app/mock/293650/",
                      "list": "getContractList",
                      "successCode": 0
                    },
                  },
                  "events": {
                    "init": "@list"
                  }
                },
              }
            }
          }
        },
        "invoiceManage": {
          "type": "component",
          "blocks": {
            "invoiceManageComponent": {
              "type": "component",
              "operations": {
                "addInvoiceManageButton": {
                  "type": "button",
                  "label": "新增申请",
                  "props": {
                    "type": "primary"
                  }
                }
              },
              "actions": {
                "addInvoiceManageButton": function() {
                  this.$router.push({path:'invoiceManageApply'})
                }
              }
            }
          }
        },
        "invoiceManageApply": {
          "type": "component",
          "resources": {
            "invoiceManageApplyResource": {
              "api": {
                "contentType": "form",
                "prefix": "http://rap2api.taobao.org/app/mock/293650/",
                "create": "create",
                "successCode": 0
              },
              "prop": {
                "ref": "invoiceManageApplyEdit"
              },
              "fields": {
                "id": {
                  "type": "text",
                  "label": "id"
                },
                "company_name": {
                  "type": "text",
                  "label": "公司",
                  "rules": [{
                    "required": true,
                    "message": "请输入公司",
                    "trigger": "blur"
                  }, {
                    "min": 1,
                    "max": 30,
                    "message": "长度在 1 到 30 个字符",
                    "trigger": "blur"
                  }],
                  "props": {
                    "placeholder": "请输入字符，长度在 1 到 30 个"
                  }
                },
                "contract_name": {
                  "type": "text",
                  "label": "合同名称",
                  "rules": [{
                    "required": true,
                    "message": "请输入合同名称",
                    "trigger": "blur"
                  }, {
                    "min": 1,
                    "max": 30,
                    "message": "长度在 1 到 30 个字符",
                    "trigger": "blur"
                  }],
                  "props": {
                    "placeholder": "请输入字符，长度在 1 到 30 个"
                  }
                },
                "contract_type": {
                  "type": "select",
                  "label": "合同状态",
                  "default": "0",
                  "props": {
                    "placeholder": "请选择",
                    
                    "multiple": false,
                    "options": {
                      "0": "未归档",
                      "1": "已归档"
                    }
                  },
                  "style": {
                    "width": "100%"
                  },
                }
              }
            }
          },
          "blocks": {
            "invoiceManageApplyComponent": {
              "type": "form",
              "fields": {
                "id": false,
                "companyName": false,
                "contractName": false,
                "contractType": false
              },
              "resource": "invoiceManageApplyResource",
              "style": {
                "width": "30%"
              },
              "ctx": "edit",
              "operations": {
                "submit": {
                  "type": "button",
                  "label": "提交",
                  "props": {
                    "type": "primary"
                  }
                }
              },
              "events": {
                "submit": "@validate @confirm:确认提交吗? @create"
              },
              "actions": {
                "cancel": function() {
                  this.$message.success("取消成功")
                },
                "create": function() {
                  this.$message.success("提交成功")
                },
                "confirm": function() {
                  console.log('1')
                }
              }
            }
          }
        },
        "setting": {
          "type": "component",
          "blocks": {

          }
        }
      },
      "type": "router"
    }
  },
  "config": {
    "materiels": {}
  }
})
