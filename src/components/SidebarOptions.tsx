'use client';

import Link from "next/link"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "../../firebase"
import { doc } from "firebase/firestore"
import { usePathname } from "next/navigation";

function SidebarOptions({ href, id }: { href: string, id: string }) {
    const [data] = useDocumentData(doc(db, "documents", id))
    const pathname = usePathname()
    const isActive = pathname.endsWith(id)

    if (!data) return null
    return (
        <Link href={href} className={`relative border p-2 rounded-md border-gray-400 ${isActive && 'bg-gray-300 border-black font-bold '}`}>
            <p className="truncate">{data?.title}</p>
        </Link>
    )
}
export default SidebarOptions