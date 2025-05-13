import { NextRequest, NextResponse } from "next/server";
import { createClient } from '../supabase/server';
import { getRateLimit } from './config/rateLimit';

export async function RouteMiddleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.ip || '127.0.0.1';

  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  const isAuthenticated = session?.access_token != null;


  if (process.env.NODE_ENV === 'production') {
    const rateLimit = getRateLimit(isAuthenticated);
    const result = await rateLimit.limit(ip);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Too Many Requests. You have sent too many requests in a short period. Please try again later."
        },
        { status: 429 }
      );
    }
  }

}
