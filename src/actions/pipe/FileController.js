//This file is automatically generated

// 图片视频上传

import { FileController } from '../controller';
export default {
    actions: {
        [FileController.fileUploading.method] : {
            summary: '文件图片上传（返回图片地址）',
            method: 'post',
            url: (payload) => `/api/platform/uploading/fileUploading`,
            parameters: [{'name':'files','in':'formData','description':'图片文件','required':true,'type':'string'}],
        },
        [FileController.videoUploading.method] : {
            summary: '文件视频上传（返回视频地址）',
            method: 'post',
            url: (payload) => `/api/platform/uploading/videoUploading`,
            parameters: [{'name':'application-dev.properties','description':'视频','required':true,'schema':{'type':'string'}},{'name':'file','in':'formData','description':'file','required':true,'type':'file'}],
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}
