import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args:{
        roomID: v.id("rooms")
    },

    handler: async(ctx, args) =>{
        const userID = await getAuthUserId(ctx)

        // if(!userID) throw new Error("Unauthorized")
        if(!userID) return []

        const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID", (q) => q
                .eq("roomID", args.roomID)
                .eq("userID", userID))
            .unique()

        if(!member) return []

        const channels = await ctx.db
            .query("channels")
            .withIndex("by_room_ID", (q) => q
                .eq("roomID", args.roomID)
            )
            .collect()

        return channels
    }
})