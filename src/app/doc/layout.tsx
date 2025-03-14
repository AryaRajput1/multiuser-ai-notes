import LiveBlockProviderCon from "@/components/LiveBlockProviderCon";

function DocLayout({ children }: { children: React.ReactNode}) {
  return (
    <LiveBlockProviderCon>{children}</LiveBlockProviderCon>
  )
}
export default DocLayout