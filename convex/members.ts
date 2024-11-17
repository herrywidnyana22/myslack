import { getAuthUserId } from "@convex-dev/auth/server";
import { query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const current = query({
    args: { roomID: v.id("rooms")},
    handler: async(ctx, args) =>{
        const userID = await getAuthUserId(ctx)

        if(!userID) return null

        const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID",
                (q) => q
                    .eq("roomID", args.roomID)
                    .eq("userID", userID)
            )
            .unique()

        if(!member) return null

        return member
    }
})

const populateUser = (ctx: QueryCtx, id:Id<"users">) =>{
    return ctx.db.get(id)
}

export const get = query({
    args: { roomID: v.id("rooms") },
    handler: async(ctx, args) =>{
        const userID = await getAuthUserId(ctx)

        if(!userID) return []

        const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID",
                (q) => q
                    .eq("roomID", args.roomID)
                    .eq("userID", userID)
            )
            .unique()

        if(!member) return []

        const data = await ctx.db
            .query("members")
            .withIndex("by_room_ID", (q) => q.eq("roomID", args.roomID))
            .collect()

        const members = []

        for(const member of data){
            const user = await populateUser(ctx, member.userID)

            if(user){
                members.push({
                    ...member,
                    user
                })
            }
        }

        return members
    }
})