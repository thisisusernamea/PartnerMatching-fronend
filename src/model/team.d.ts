import {TeamStatusEnum} from "../constants/team.ts";
import UserType from "./user";

/**
 * 队伍信息模板
 */
export type TeamType = {
    id: number;
    description: string;
    expireTime?: Date;
    maxNum: number;
    name: string;
    password?:string;
    userId:number;
    status: TeamStatusEnum;
    createTime:Date;
    updateTime:Date;
    createUser?:UserType;
};

export default TeamType;
