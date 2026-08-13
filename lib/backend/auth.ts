

export async function auth({email, password, type, username, name, upline, phone, confirmPassword, country}: Auth):Promise<AuthResponse> {
    const response = await fetch(`/api/auth`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, type, username, name, upline, phone, confirmPassword, country})
    })

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    return await response.json()
}