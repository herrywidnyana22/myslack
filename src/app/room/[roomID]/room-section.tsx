import { useToggle } from "react-use"
import { Info } from "@/components/info"
import { Button } from "@/components/ui/button"
import { ChevronDown, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type RoomSectionProps = {
    children: React.ReactNode
    label: string
    info: string
    onAdd?: () => void
}

export const RoomSection = ({
    children,
    label,
    info,
    onAdd
}: RoomSectionProps) => {

    const [toggleActive, toggle] = useToggle(true)

    return ( 
        <div
            className="
                flex
                flex-col
                px-2
                mt-3
            "
        >
            <div
                className="
                    group
                    flex
                    items-center
                    px-3.5
                "
            >
                <Button
                    onClick={toggle}
                    variant="transparent"
                    className="
                        size-6
                        p-0.5
                        shrink-0
                        text-sm
                        text-textsidebar
                    "
                >
                    <ChevronDown 
                        className={cn(`
                            size-5
                            transition-transform`,
                            !toggleActive && "-rotate-90"
                        )}
                    />
                </Button>
                <Button
                    variant={"transparent"}
                    size={"sm"}
                    className="
                        group
                        h-7
                        justify-start
                        items-center
                        px-2
                        text-sm
                        overflow-hidden
                        text-textsidebar
                    "
                >
                    <span className="truncate">
                        { label }
                    </span>
                </Button>
                {
                    onAdd && (
                        <Info
                            label={info}
                            side="top"
                            align="center"
                        >
                            <Button
                                onClick={onAdd}
                                variant={"transparent"}
                                size={"iconSm"}
                                className="
                                    size-6
                                    ml-auto
                                    p-1
                                    text-sm
                                    opacity-0
                                    shrink-0
                                    transition-opacity
                                    text-textsidebar
                                    group-hover:opacity-100
                                "
                            >
                                <PlusIcon className="size-5"/>
                            </Button>
                        </Info>
                    )
                }

            </div>
            { toggleActive && 
                <div className="ml-7">
                    {children}
                </div>
            }
        </div>
    );
}