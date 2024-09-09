import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const currentUserID = query({
    args:{},
    handler: async(ctx) =>{
        // const userID = await auth.getUserId(ctx)
        const userID = await getAuthUserId(ctx)
        
        if(userID === null){
            return null
        }

        return await ctx.db.get(userID)
    }
})