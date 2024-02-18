import myAxios from "../plugins/myAxios.ts";
import {setCurrentUserState} from "../states/user.ts";
import {showFailToast, showSuccessToast} from "vant";

export const getCurrentUser = async () => {
    /*const currentUser = getCurrentUserState();*/
    //从前端缓存中获取currentUser
    /*if(currentUser){
        showSuccessToast('获取当前用户信息成功');
        return currentUser;
    }*/
    //若前端缓存不存在currentUser,则从后端获取
    const res = await myAxios.get('/user/current');
    if(res.code === 0){
        setCurrentUserState(res.data);
        showSuccessToast('获取当前用户信息成功');
        return res.data;
    }
    //currentUser获取失败
    showFailToast('获取当前用户信息失败');
    return null;
}


