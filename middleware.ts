import { NextResponse, userAgent } from 'next/server';

import type { NextRequest } from 'next/server';

// 追い払いたい Bot たち
const uaBlackList = Object.freeze([
  'PetalBot',
  'SemrushBot',
]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { ua, device } = userAgent(request)

  // robot.txt へのアクセスは除く
  if (
    uaBlackList.some((blackUa) => ua.indexOf(blackUa) > -1) &&
    request.nextUrl.pathname !== '/robots.txt'
  ) {
    request.nextUrl.pathname = '/403.html';
    return NextResponse.rewrite(request.nextUrl, { status: 403 });
  }

  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
