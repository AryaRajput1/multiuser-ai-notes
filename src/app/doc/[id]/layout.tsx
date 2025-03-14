import RoomProviderCon from "@/components/RoomProviderCon";

async function RoomProviderLayout({ params, children }: { params: Promise<{ id: string }>, children: React.ReactNode }) {
    const { id } = await params
    return (
        <RoomProviderCon id={id}>
                    {children}
        </RoomProviderCon>
    )
}
export default RoomProviderLayout