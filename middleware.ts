import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

 
  if (user && pathname.startsWith('/v2/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (
    !user &&
    !pathname.startsWith('/v2/auth') &&
    !pathname.startsWith('/auth') &&
    !pathname.startsWith('/terms') &&
    !pathname.startsWith('/pricing') &&
    !pathname.startsWith('/privacy') &&
    !pathname.startsWith('/about') &&
    !pathname.startsWith('/refund-policy') &&
    !pathname.startsWith('/cookie-policy') &&
    !pathname.startsWith('/_next') &&
    !/\.(svg|png|jpg|jpeg|gif|webp)$/.test(pathname) &&
    pathname !== '/'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/v2/auth'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|terms|pricing|privacy|about|refund-policy|api/dev/v2/connect/graphql|cookie-policy|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)',
  ],
}
