// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Don't modify paths for assets like fonts
  if (
    pathname.startsWith('/assets/fonts') ||
    pathname === pathname.toLowerCase()
  ) {
    return NextResponse.next()
  }
  
   // Skip lowercase transformation for static files (images, videos, JS, CSS, etc.)
   if (
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|css|js|woff|woff2|mp4|webm|ogg)$/)) {
    return NextResponse.next() // Continue without modification for these static files
  }
  const lowercaseUrl = request.nextUrl.clone()
  lowercaseUrl.pathname = pathname.toLowerCase()

  return NextResponse.redirect(lowercaseUrl)
}

