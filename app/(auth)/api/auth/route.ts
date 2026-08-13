import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

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
    const token = jwt.sign({ userID: results.userID }, jwtSecret)

    // Return backend response fields unchanged, add token
    const res = NextResponse.json(
      { ...results, token },
      { status: 200 }
    )

    // Set cookie (httpOnly recommended)
    res.cookies.set({
      name: "susyr7q3ycugfWDFF",
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
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
