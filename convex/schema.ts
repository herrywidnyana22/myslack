import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    rooms: defineTable({
        name: v.string(),
        userID: v.id("users"),
        joinCode: v.string()
    }),
    members: defineTable({
        userID: v.id("users"),
        roomID: v.id("rooms"),
        role: v.union(v.literal("admin"), v.literal("member"))
    })

    .index("by_user_ID", ['userID'])
    .index("by_room_ID", ['roomID'])
    .index("by_room_ID_and_user_ID", ['roomID', 'userID'])
})
 
export default schema;