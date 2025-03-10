import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

function Sidebar() {

    const sidebarOptions = <>
    <NewDocumentButton />
    </>
    return (
        <div className="p-2 bg-gray-200 md:p-5 relative">
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <MenuIcon className="p-1 hover:opacity-30 rounded-lg"/>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <div>
                            {sidebarOptions}
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            </div>
            <div className="hidden md:inline">
                { sidebarOptions }
            </div>
        </div>
    )
}

export default Sidebar