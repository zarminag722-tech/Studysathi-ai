export const metadata = {
  title: 'StudySathi AI',
  description: 'Your AI study companion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
