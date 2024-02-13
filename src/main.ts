import { createApp } from 'vue'
import App from './App.vue'
import {
    Button,
    Cell,
    CellGroup,
    Col,
    Divider,
    Field,
    Form,
    Icon,
    NavBar,
    Row,
    Space,
    Tabbar,
    TabbarItem,
    Tag
} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./configs/route.ts";

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router);
app.use(Divider);
app.use(Tag);
app.use(Col);
app.use(Row);
app.use(Space);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(CellGroup);
/*转换unix时间戳*/
app.config.globalProperties.$filters = {
    formatTime(timestamp) {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}

app.mount('#app')








