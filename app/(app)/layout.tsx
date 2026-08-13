import ClientLoginInitializer from "@/components/shared/client-login-initializer"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      <head>
        <link rel="preconnect" href="https://grover.xgramm.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://grover.xgramm.com" />
        {/* Optional: preload the first bytes is not guaranteed for video, but can still help */}
        <link
          rel="preload"
          as="video"
          href="https://grover.xgramm.com/admin/uploads/grover.fast.mp4"
          type="video/mp4"
        />
      </head>
        <ClientLoginInitializer/>
        {children}
        
    </>
  )
}