function load_img(url, index) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            resolve();
        };
        img.onerror = () => {
            reject(`索引：${index} 图片加载错误`)
        }
    })
}

export const lazyLoadingImg = () => {
    const IMG_LIST = [
        require('@/assets/logo.png'),
        require('@/assets/qrcode.png'),
        require('@/assets/toTop.png'),
        require('@/assets/activity.png'),

        require('@/assets/banner_1.png'),
        require('@/assets/banner_2.png'),
        require('@/assets/banner_3.png'),
        require('@/assets/banner_4.png'),
    ];
    let i, len, list = [];
    for (i = 0, len = IMG_LIST.length; i < len; i++) {
        list.push(load_img(IMG_LIST[i], i))
    }
    return Promise.all(list);
};