import ams from "@ams-team/ams";
import routeList from "./components/routes"

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
    "routerBlock": {
      "type": "router",
      "router": {
        "defaultBreadcrumb": true,
        "routes": routeList.routes
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
                      "dept": {
                        "label": "所属部门",
                        "type": "text"
                      },
                      "contractNum": {
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
                  "operations": {
                    "check": {
                      "type": "button",
                      "label": "查看",
                      "props": {
                        "size": "mini"
                      }
                    },
                    "lawArchive": {
                      "type": "button",
                      "label": "归档",
                      "props": {
                        "size": "mini",
                        "type": "primary",
                      }
                    },
                    "lawArchiveCancel": {
                      "type": "button",
                      "label": "取消",
                      "props": {
                        "size": "mini",
                        "type": "info",
                      }
                    }
                  },
                  "events": {
                    "init": "@list",
                    "check": "@contractListCheckDialog.show"
                  },
                  "actions": {
                    "list": function(...args) {
                      return new Promise((resolve, reject) => {
                        this.$ams.actions.list.call(this, {
                          ...args,
                          success(res) {
                            let data = res.data.data;

                            if (res.data.code === 0 && data) {
                              this.data.list = data.list
                              this.data.total = data.total
                              this.renderListDataChangeInfors(data.list)
                              resolve()
                            } else {
                              this.$message.error(`${res.data.msg}(${res.data.code})`)
                              reject()
                            }
                          }
                        })
                      })
                    },
                    "renderListDataChangeInfors": function(data) {
                      data.forEach(element => {
                        element.lawArchive == 1 ? element.archiveType = '已归档' : element.archiveType = '未归档';
                        element.contractStatus == 1 ? element.contractType = '开启' : element.contractType = '关闭';
                      })
                    }
                  }
                },
                "contractListCheckDialog": {
                  "type": "dialog",
                  "operations": {
                    "submit": {
                      "type": "button",
                      "label": "已阅",
                      "props": {
                        "type": "primary"
                      }
                    },
                    "hide": {
                      "type": "button",
                      "label": "关闭"
                    },
                  },
                  "actions": {
                    "submit": function() {
                      this.$message("你点击了已阅按钮")
                    }
                  },
                  "blocks": {
                    "dialogText": {
                      "type": "component",
                      "options": {
                        "is": "div",
                        "text": "我是弹窗内容"
                      }
                    }
                  },
                  "style": {
                    "width": "30%",
                    "margin": "0 auto"
                  }
                }
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
                "create": "createContractApply",
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
                  "default": "公司名称1",
                  "rules": [
                    {
                      "required": true,
                      "message": "请输入公司",
                      "trigger": "blur"
                    }, {
                      "min": 1,
                      "max": 30,
                      "message": "长度在 1 到 30 个字符",
                      "trigger": "blur"
                    }
                  ]
                },
                "contract_name": {
                  "type": "text",
                  "label": "合同名称",
                  "default": "合同名称1",
                  "rules": [
                    {
                      "required": true,
                      "message": "请输入合同名称",
                      "trigger": "blur"
                    }, {
                      "min": 1,
                      "max": 30,
                      "message": "长度在 1 到 30 个字符",
                      "trigger": "blur"
                    }
                  ]
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
              "ctx": "edit",
              "type": "form",
              data: {
                id: "",
                companyName: "",
                contractName: "",
                contractType: ""
              },
              "resource": "invoiceManageApplyResource",
              "style": {
                "width": "30%"
              },
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
                "submit": "@validate @confirm:确认提交吗? @return"
              },
              "actions": {
                "cancel": function() {
                  this.$message.success("取消成功")
                },
                "return": function() {
                  this.$router.push({path:'contractManage/contractArchive'})
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
      }
    }
  },
  "config": {
    "materiels": {}
  }
})
