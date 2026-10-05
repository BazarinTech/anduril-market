import ClientLoginInitializer from "@/components/shared/client-login-initializer"
import { SpartacusGuide } from "@/components/tour/spartacus-guide"

// A nested layout must not render <head>: only the root layout owns
// <html>/<head>/<body>, so a <head> here is emitted inside <body> -- invalid
// HTML and a hydration error. The one that was here preconnected to and
// preloaded a video from another project's domain that nothing in this app
// plays, so it was removed rather than moved.
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ClientLoginInitializer />
      {children}
      {/* Lives above the routes so the tour survives moving between them. */}
      <SpartacusGuide />
    </>
  )
}
