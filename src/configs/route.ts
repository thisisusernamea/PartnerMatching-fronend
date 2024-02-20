import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import UserUpdate from "../pages/UserUpdate.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";

// 定义一些路由
// 每个路由都需要映射到一个组件(html页面)。
const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/team/add', component: TeamAdd },
    { path: '/team/update', component: TeamUpdate },
    { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', component: UserEdit },
    { path: '/user/list', component: SearchResult },
    { path: '/user/login', component: UserLogin },
    { path: '/user/update', component: UserUpdate },
    { path: '/user/team/create', component: UserTeamCreate },
    { path: '/user/team/join', component: UserTeamJoin },


]

export default routes