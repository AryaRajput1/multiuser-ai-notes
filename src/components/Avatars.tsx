import { useOthers, useSelf } from "@liveblocks/react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Avatars() {
    const self = useSelf()
    const others = useOthers()
    const all = [self, ...others]
    return (
        <div className="flex gap-2 items-center">
            <p className="font-light text-sm">Users currently editing this page</p>
            <div className="flex -space-x-5">
                {
                    all.map((mem) => (
                        <TooltipProvider key={mem?.info.email}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="hover:z-50">
                                        <AvatarImage src={mem?.info.avatar} />
                                        <AvatarFallback>{ mem?.info.name }</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <>{ self?.id === mem?.id ? 'You' : mem?.info.name }</>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))
                }
            </div>

        </div>
    )
}
export default Avatars