import Vue from "vue"
import qyTips from "./qy-tips";
// const qyTips = require("./qy-tips");

const TIPS = Vue.extend(qyTips);
let seed  = 0;
export const tips =(option)=>{
    seed  +=1;
    option = option || {};
    const id = 'qy-tips-' + seed;
    let tips = new TIPS({
        data:option
    })
    tips.id=id;
    tips.$mount();
    tips.dom = tips.$el;
    document.body.appendChild(tips.dom);
    tips.dom.style.zIndex = 2022+seed;
    tips.dom.classList.add(id);
    tips.close = ()=>{
        document.body.removeChild(tips.dom);
        tips.$destroy();
    }
    return tips;
}