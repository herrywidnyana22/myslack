'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "./components/sidebar";
import { Toolbar } from "./components/toolbar";
import { RoomSidebar } from "./components/room-sidebar";

interface RoomIDLayoutProps{
    children: React.ReactNode
}

const RoomIDLayout = ({children}: RoomIDLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar/>
            <div className="h-[calc(100vh-40px)] flex">
                <Sidebar/>
                <ResizablePanelGroup
                    direction="horizontal"
                    autoSaveId={"my-room-layout"}
                >
                    <ResizablePanel
                        defaultSize={20}
                        minSize={10}
                        className="bg-channel"
                    >
                        <RoomSidebar/>
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel minSize={20}>
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}
 
export default RoomIDLayout;