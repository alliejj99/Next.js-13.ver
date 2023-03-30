import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next 13.ver - Board App",
  description: "Next 13.ver - Board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
        /> */}
      </head>
      <body>
        <nav>
          <Link href="/">[Home]</Link> &nbsp;&nbsp;
          <Link href="/posts">[Post]</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
