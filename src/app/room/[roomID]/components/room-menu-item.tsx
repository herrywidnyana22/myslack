import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { useRoomID } from "@/hooks/use-room-id";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const roomMenuItemVariants = cva(`
    h-7 
    flex 
    items-center 
    gap-1.5 
    justify-start 
    px-[18px] 
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

type RoomMenuItemProps = {
    id: string
    label: string
    icon: LucideIcon | IconType
    variant?: VariantProps<typeof roomMenuItemVariants>["variant"]
}

export const RoomMenuItem = ({
    id,
    label,
    icon: Icon,
    variant
}: RoomMenuItemProps) => {
    const roomID = useRoomID()

    return ( 
        <Button 
            asChild
            variant={"transparent"}
            size={"sm"}
            className={cn(roomMenuItemVariants({ variant }))}
        >
            <Link
                href={`/room/${roomID}/channel/${id}`}
            >
                <Icon 
                    className="
                        size-4 
                        mr-1 
                        shrink-1
                    "
                />
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