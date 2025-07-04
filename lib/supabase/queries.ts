"use server"
import { Subscription } from "../../database.types"
import db from "./db"

export const  getUserSubscriptionStatus =  async(userId: string)=>{
    try{
        const data = await  db.query.subscriptions.findFirst({
            where: (s,{eq})=>eq(s.userId, userId),
        });
        if(data) return { data: data as Subscription, error: null};
        else return {data: null, error:null}
    }catch(error)
        {
            console.log (error)
            return{data:null, error:`Error ${error}`}
        }
}