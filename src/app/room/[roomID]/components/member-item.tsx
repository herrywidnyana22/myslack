import { Button } from "@/components/ui/button";
import { Id } from "../../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRoomID } from "@/hooks/use-room-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userItemVarian = cva(`
    h-7 
    flex 
    items-center 
    gap-1.5 
    justify-start 
    px-4
    font-normal 
    text-sm 
    overflow-hidden
`, 
    {
        variants:{
            variant:{
                default: "text-textsidebar",
                active: "text-toolbar bg-white/90 hover:bg-white/90"
            }
        },

        defaultVariants:{
            variant: "default"
        }
    }
)

type MemberItemProps = {
    id: Id<"members">
    label?: string
    image?: string
    variant?: VariantProps<typeof userItemVarian>["variant"]

}
export const MemberItem = ({
    id,
    label = "Member",
    image,
    variant
}: MemberItemProps) => {

    const roomID = useRoomID()
    const avatarLabel = label.charAt(0).toUpperCase()

    return ( 
        <Button
            asChild
            variant={"transparent"}
            size={"sm"}
            className={cn(userItemVarian({variant: variant}))}
        >
            <Link
                href={`/room/${roomID}/member/${id}`}
            >
                <Avatar
                    className="
                        size-5 
                        mr-1
                        rounded-full 
                    "
                >
                    <AvatarImage
                        src={image}
                        className="rounded-full"
                    />
                    <AvatarFallback
                        className="
                            rounded-full
                        "
                    >
                        { avatarLabel }
                    </AvatarFallback>
                </Avatar>
                <span
                    className="
                        text-sm
                        truncate
                    "
                >
                    { label }
                </span>
            </Link>
        </Button>
    );
}