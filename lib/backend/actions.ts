const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getMains({userID}: CommonFetch):Promise<Mains> {
    const response = await fetch(`${backendUrl}/mains.php`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID})
    })

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    return await response.json()
}

export async function makeInvestment({userID, prodID, amount} : Invest): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/invest.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, prodID, amount})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function claimEarnings({userID, orderID} : ClaimEarnings): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/returns.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, orderID})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function updateAccount({userID, email, phone} : ModifyAccount): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/account.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, email, phone, type: 'account'})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function updatePassword({userID, oldPassword, newPassword, confirmPassword} : ModifyAccount): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/account.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, oldPassword, newPassword, confirmPassword, type: 'password'})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function initiateDeposit({userID, amount, account, method} : Transact): Promise<DepositResponse> {
    const response = await fetch(`${backendUrl}/deposit.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, amount, account, method})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function initiateWithdrawal({userID, amount, account, method, pin} : WithdrawFunds): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/withdraw.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, amount, account, method, pin})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function initiateTransfer({userID, amount, recipient,method} : TransferFunds): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/transfer.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, amount, recipient, method})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function requestVerificationCode({phone} : VerificationRequest): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/verification.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone, type: 'RequestPhoneVerification'})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function verifyCode({phone, code} : VerificationRequest): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/verification.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone, type: 'VerifyPhone', code})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function resetPassword({phone, code, newPassword} : ForgotPasswordRequest): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/forgot-password.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone, code, newPassword})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function applyIncentives({userID, name, phone, idNumber, incentiveID} : IncentivesApplication): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/incentive-application.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, name, phone, idNumber, incentiveID})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function couponRedeem({userID, code} : Coupon): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/coupon.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, code})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function claimBonus({userID, bonusID} : claimBonus): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/bonus.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, bonusID})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function checkStkStatus({trackingID} : CheckSTKStatus): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/stk-status.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trackingID})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}

export async function cashoutWalletSetup({userID, phone, accountName, pin, type} : CashoutWalletSetup): Promise<GeneralResponse> {
    const response = await fetch(`${backendUrl}/withdraw-account.php`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, phone, accountName, pin, type})
    })
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    return await response.json()
}