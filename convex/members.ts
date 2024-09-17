import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const current = query({
    args: { roomID: v.id("rooms")},
    handler: async(ctx, args) =>{
        const userID = await getAuthUserId(ctx)

        if(!userID) return null

        const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID",
                (q) => q.eq("roomID", args.roomID).eq("userID", userID)
            )
            .collect()

        if(!member) return null

        return member
    }
})