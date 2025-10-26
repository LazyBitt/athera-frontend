export const metadata = {
  title: 'Athera - Crypto Inheritance on Base',
  description: 'Automated crypto inheritance that protects your legacy',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://atheraa.vercel.app/og-image.png',
    'fc:frame:button:1': 'Launch Athera',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://atheraa.vercel.app/frame',
  },
}

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
