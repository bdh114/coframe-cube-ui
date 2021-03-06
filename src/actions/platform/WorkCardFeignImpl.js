//This file is automatically generated

// 员工卡

import { WorkCardFeignImpl } from '../controller';
export default {
    actions: {
        [WorkCardFeignImpl.addWorkCard.method] : {
            summary: '新增一个员工卡',
            method: 'post',
            url: (payload) => `/api/platform/dal/workCard/addWorkCard`,
            parameters: [{'in':'body','name':'entity','description':'entity','required':true,'schema':{'$ref':'#/definitions/员工卡'}}],
        },
        [WorkCardFeignImpl.addWorkCardRecord.method] : {
            summary: '新增一个员工卡记录',
            method: 'post',
            url: (payload) => `/api/platform/dal/workCard/addWorkCardRecord`,
            parameters: [{'in':'body','name':'entity','description':'entity','required':true,'schema':{'$ref':'#/definitions/员工卡记录'}}],
        },
        [WorkCardFeignImpl.getWorkCard.method] : {
            summary: '查询一个员工卡',
            method: 'get',
            url: (payload) => `/api/platform/dal/workCard/getWorkCard/${payload.id}`,
            parameters: [{'name':'id','in':'path','description':'主键','required':true,'type':'string'}],
        },
        [WorkCardFeignImpl.queryWorkCard.method] : {
            summary: '使用code查询一个员工卡',
            method: 'get',
            url: (payload) => `/api/platform/dal/workCard/queryWorkCard/${payload.code}`,
            parameters: [{'name':'code','in':'path','description':'主键','required':true,'type':'string'}],
        },
        [WorkCardFeignImpl.queryWorkCardRecord.method] : {
            summary: '查询员工卡记录',
            method: 'get',
            url: (payload) => `/api/platform/dal/workCard/queryWorkCardRecord`,
            parameters: [],
        },
        [WorkCardFeignImpl.replacement.method] : {
            summary: '员工卡补卡',
            method: 'put',
            url: (payload) => `/api/platform/dal/workCard/replacementWorkCard`,
            parameters: [{'in':'body','name':'entity','description':'entity','required':true,'schema':{'$ref':'#/definitions/员工卡'}}],
        },
        [WorkCardFeignImpl.updateWorkCard.method] : {
            summary: '修改一个员工卡',
            method: 'put',
            url: (payload) => `/api/platform/dal/workCard/updateWorkCard`,
            parameters: [{'in':'body','name':'entity','description':'entity','required':true,'schema':{'$ref':'#/definitions/员工卡'}}],
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}
