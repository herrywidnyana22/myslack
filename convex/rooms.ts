import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args:{
        name: v.string()
    }, 
    handler: async(ctx, args)=>{
        const userID = await getAuthUserId(ctx)

        if(!userID) throw new Error("Unauthorized")
        
        const generateJoinCode = () =>{
            const code = Array.from(
                { length: 6}, 
                () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)] 
            ).join("")

            return code
        }
        const joinCode = generateJoinCode()

        const roomID = await ctx.db.insert('rooms', {
            name: args.name,
            userID,
            joinCode
        })

        await ctx.db.insert("members", {
            userID,
            roomID,
            role: "admin"
        })

        await ctx.db.insert("channels", {
            name: "general",
            roomID
        })

        return roomID
    }
})

export const get = query({
    args:{},
    handler: async(ctx) =>{
        const userID = await getAuthUserId(ctx)

        if(!userID) return null

        const members = await ctx.db
            .query("members")
            .withIndex("by_user_ID", (q) => q.eq("userID", userID))
            .collect()

        const roomIDs = members.map((member) => member.roomID)

        const rooms = []

        for(const roomID of roomIDs){
            const room = await ctx.db.get(roomID)

            if(room){
                rooms.push(room)
            }
        }

        return rooms
    }
})

export const getByID = query({
    args: {
        id: v.id("rooms")
    },
    handler: async(ctx, args) =>{
        const userID = await getAuthUserId(ctx)

        if(!userID) throw new Error("Unauthorized")

        const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID", 
                (q) => q
                    .eq("roomID", args.id)
                    .eq("userID", userID)
            )
            .unique()

        if(!member) return null

        return await ctx.db.get(args.id)
    },
})


export const update = mutation({
    args:{
        id: v.id("rooms"),
        name: v.string()
    },
    handler: async(ctx, args) => {
        const userID = await getAuthUserId(ctx)

        if(!userID) throw new Error("Unauthorized")

        const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID", 
                (q) => q
                    .eq("roomID", args.id)
                    .eq("userID", userID)
            )
            .unique()

        if(!member || member.role !== "admin") throw new Error("Unauthorized")

        await ctx.db.patch(args.id, {
            name: args.name
        })

        return args.id
    }
})

export const remove = mutation({
    args:{
        id: v.id("rooms")
    },
    handler: async(ctx, args) => {
        const userID = await getAuthUserId(ctx)

        if(!userID) throw new Error("Unauthorized")

            const member = await ctx.db
            .query("members")
            .withIndex("by_room_ID_and_user_ID", 
                (q) => q
                    .eq("roomID", args.id)
                    .eq("userID", userID)
            )
            .unique()

        if(!member || member.role !== "admin") throw new Error("Unauthorized")

        const [members] = await Promise.all([
            ctx.db
            .query("members")
            .withIndex("by_room_ID", (q) => q.eq("roomID", args.id))
            .collect()
        ])

        for (const member of members){
            await ctx.db.delete(member._id)
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})