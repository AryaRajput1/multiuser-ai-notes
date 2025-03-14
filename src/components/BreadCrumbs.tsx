'use client'

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


function BreadCrumbs() {

    const pathname = usePathname()

    const breadcrumbsItems = pathname.split('/')

    console.log(breadcrumbsItems)
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    breadcrumbsItems.map((item, index) => {
                        if (!item) {
                            return null
                        }

                        const href = breadcrumbsItems.slice(0, index + 1).join('/')
                        const isLast = index === breadcrumbsItems.length - 1

                        return <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {
                                    isLast ?
                                        <BreadcrumbPage>{item}</BreadcrumbPage> :
                                        <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                        </>
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default BreadCrumbs