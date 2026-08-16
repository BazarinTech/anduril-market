import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/session"

export async function POST(req: Request) {
  const body = (await req.json()) as Auth

  const backendUrl = process.env.BACKEND_URL
  const jwtSecret = process.env.JWT_SECRET

  // Keep same response contract style (status/message/error)
  if (!backendUrl) {
    return NextResponse.json(
      { status: "Failed", message: "BACKEND_URL is not set", error: [] },
      { status: 200 }
    )
  }

  if (!jwtSecret) {
    return NextResponse.json(
      { status: "Failed", message: "JWT_SECRET is not set", error: [] },
      { status: 200 }
    )
  }

  const payload =
    body?.type === "login"
      ? {
          type: "login",
          phone: body.phone,
          password: body.password,
        }
      : body?.type === "register"
        ? {
            type: "register",
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
            upline: body.upline,
            username: body.username,
            phone: body.phone,
            name: body.name,
            country: body.country,
          }
        : null

  if (!payload) {
    return NextResponse.json(
      { status: "Failed", message: "Invalid auth type", error: [] },
      { status: 200 }
    )
  }

  try {
    const r = await fetch(`${backendUrl}/auth.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const text = await r.text()

    let results: AuthResponse
    try {
      results = JSON.parse(text)
    } catch {
      // Match backend-style contract
      return NextResponse.json(
        {
          status: "Failed",
          message: "Backend did not return valid JSON",
          error: [],
        },
        { status: 200 }
      )
    }

    // If backend says not Success, just pass through EXACTLY
    if (results?.status !== "Success" || !results?.userID) {
      return NextResponse.json(results, { status: 200 })
    }

    // Backend success: sign token and return same response + token
    //
    // `expiresIn` matters. Without an `exp` claim these tokens were valid
    // forever -- the cookie's maxAge only governed the browser, and the
    // ExpiredException handler in every PHP endpoint was unreachable code.
    const token = jwt.sign({ userID: results.userID }, jwtSecret, {
      expiresIn: SESSION_MAX_AGE_SECONDS,
    })

    // Return backend response fields unchanged, add token
    const res = NextResponse.json(
      { ...results, token },
      { status: 200 }
    )

    // This cookie used to be *named* after the signing secret, publishing the
    // key to every visitor. See lib/session.ts.
    //
    // httpOnly stays false deliberately: lib/stores/use-main-store.ts reads
    // this cookie from client code and hands the token to the PHP API on every
    // call. Turning it on means proxying those calls through route handlers
    // first, which is a separate piece of work rather than a flag flip.
    res.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    })

    return res
  } catch (error) {
    // Still match backend-style response
    return NextResponse.json(
      {
        status: "Failed",
        message: "An error occurred while authenticating",
        error: String(error),
      },
      { status: 200 }
    )
  }
}
