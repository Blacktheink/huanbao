export const navigation = [
    {
        path: '/home',
        name: 'home',
        components: {
            content: r => require.ensure([], () => r(require('../views/home/index')), 'router-init'),
        },
        meta: {
            id: 0,
            label: '首页',
            show: true,
        },
    },
    {
        path: '/xwzx',
        name: 'xwzx',
        components: {
            content: r => require.ensure([], () => r(require('../views/wenzhang/index')), 'router-init'),
        },
        meta: {
            id: 1,
            label: '新闻资讯',
            show: true,
        },
    },
    {
        path: '/flfg',
        name: 'flfg',
        components: {
            content: r => require.ensure([], () => r(require('../views/fagui/index')), 'router-init'),
        },
        meta: {
            id: 2,
            label: '法律法规',
            show: true,
        },
    },
    {
        path: '/qwhd',
        name: 'qwhd',
        components: {
            content: r => require.ensure([], () => r(require('../views/huodong/index')), 'router-init'),
        },
        meta: {
            id: 3,
            label: '趣味活动',
            show: true,
        },
    },
    // {
    //     path: '/gywm',
    //     name: 'gywm',
    //     components: {
    //         content: r => require.ensure([], () => r(require('../views/guanyu/index')), 'router-init'),
    //     },
    //     meta: {
    //         id: 4,
    //         label: '关于我们',
    //     },
    // },
    {
        path: '/details',
        name: 'details',
        components: {
            content: r => require.ensure([], () => r(require('../views/onePage/detailsList')), 'router-init'),
        },
        meta: {
            id: 5,
            label: '详情',
        },
    },
];


export const news = [
        {
            "searchValue": null,
            "createBy": null,
            "createTime": "2021-03-27 09:52:28",
            "updateBy": null,
            "updateTime": "2021-03-27 09:52:31",
            "remark": null,
            "params": {},
            "id": 2,
            "title": "测试标题",
            "info": "测试信息",
            "type": 1,
            "content": "测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
            "note": "测试备注",
            "audit": 0
        },
        {
            "searchValue": null,
            "createBy": null,
            "createTime": "2021-03-27 13:47:51",
            "updateBy": null,
            "updateTime": "2021-03-27 13:48:17",
            "remark": null,
            "params": {},
            "id": 3,
            "title": "页面添加标题",
            "info": "页面添加信息",
            "type": 2,
            "content": "页面添加文章内容",
            "note": "页面添加备注",
            "audit": 1
        },
        {
            "searchValue": null,
            "createBy": null,
            "createTime": "2021-04-22 08:31:52",
            "updateBy": null,
            "updateTime": "2021-04-22 22:13:51",
            "remark": null,
            "params": {},
            "id": 4,
            "title": "aaa",
            "info": "aaa",
            "type": 2,
            "content": "<p>aaasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasss<span style=\"background-color: rgb(255, 255, 0);\">ddddaaas</span>ssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssdddda<b>aasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssddddaaasssd</b>dddaaasssddddaaasssddddaaasssddddaaasssddddaaasssdddd<u>aaasssdd</u>ddaaasssdddd<br></p>",
            "note": "aaab",
            "audit": 0
        },
        {
            "searchValue": null,
            "createBy": null,
            "createTime": "2021-04-27 14:32:13",
            "updateBy": null,
            "updateTime": "2021-03-27 09:52:28",
            "remark": null,
            "params": {},
            "id": 5,
            "title": "123123",
            "info": "123123",
            "type": 1,
            "content": "123321321321",
            "note": "123123",
            "audit": 0
        }
    ];

export const thirdParty = [
    {
        label:'中国环境网',
        url:'https://www.cenews.com.cn/',
        img:require('@/assets/banner_1.png'),
    },
    {
        label:'北极星环保网',
        url:'https://huanbao.bjx.com.cn/',
        img:require('@/assets/banner_2.png'),
    },
    {
        label:'绿色发展联盟',
        url:'http://www.cgda65.cn/',
        img:require('@/assets/banner_3.png'),
    },
    {
        label:'中国环境报理事会',
        url:'https://www.cenews.com.cn/lsh/',
        img:require('@/assets/banner_4.png'),
    },
    {
        label:'中华人民共和国生态环境部',
        url:'http://www.mee.gov.cn/',
        img:require('@/assets/banner_5.png'),
    },
    {
        label:'中国共产党新闻网',
        url:'http://cpc.people.com.cn/',
        img:require('@/assets/banner_6.png'),
    },
];