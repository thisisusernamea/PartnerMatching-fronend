/**
 * 用户信息模板
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    planetCode: string;
    gender: number;
    phone: string;
    email:string;
    userStatus: number;
    avatarUrl?:string;
    createTime:string;
    userRole: number;
    tags : string[];
    profile?:string;
};
export default UserType;