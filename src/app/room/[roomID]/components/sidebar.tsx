import { UserButton } from "@/features/auth/components/user-button";
import { RoomSwitcher } from "./room-switcher";
import { SidebarItem } from "./sidebar-item";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

type Props = {
 
}
export const Sidebar = ({}: Props) => {
    return ( 
        <aside 
            className="
                h-full 
                w-20 
                flex 
                flex-col 
                gap-y-4 
                items-center 
                pt-2 
                pb-4
                bg-toolbar 
            "
        >
            <RoomSwitcher/>
            <SidebarItem 
                icon={Home} 
                label="Home" 
                isActive
            />
            <SidebarItem 
                icon={MessageSquare} 
                label="Chat"
            />
            <SidebarItem 
                icon={Bell} 
                label="Activity"
            />
            <SidebarItem 
                icon={MoreHorizontal} 
                label="More"
            />
            <div 
                className="
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    gap-y-1 
                    mt-auto
                "
            >
                <UserButton/>
            </div>
        </aside>
    );
}