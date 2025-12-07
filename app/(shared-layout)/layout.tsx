import Navbar from "@/components/Navbar";

export default function SharedLayout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}