type ID = number

type Amount = string

type TransactionStatus = "Pending" | "Completed" | "Failed" | "Success" | "Approved" | "Rejected" | "Processing"

type Auth = {
    email?: string
    type: 'login' | 'register'
    password: string
    confirmPassword?:string
    phone:string
    upline?:string
    username?:string
    name?:name
    country?: string
}
type GeneralResponse = {
    status: string
    message: string

}

type AuthResponse = GeneralResponse & {
    userID?:ID
    token?: string
}

type User = {
    email: string,
    phone: string,
    date_joined: string
    status: string,
    upline: string,
    ID: ID,
    date_created?: string
    username:string
    role: string
    country: string
}

type Wallet = {
    balance: Amount,
    total_deposits: Amount,
    total_withdrawals: Amount,
    income: Amount,
    invite_income: Amount,
    status: string
    total_invested: Amount
    withdrawal_pin: string
    level: string
    today_income: Amount
    withdrawal_account: string
    withdrawal_name: string
}
type InvestmentOrder = {
    ID: ID,
    product_name: string,
    product_price: Amount,
    duration: number,
    status: string,
    amount: Amount,
    investment_date: string,
    total_returns: Amount,
    return_rate: number,
    remaining: number
    product_description:string,
    image: string,
    roll: number
}

type Bonus = {
    ID: ID,
    name: string,
    type: string,
    reward: string,
    is_claimed: boolean,
    target: number
    status: string,
    time: string,
    reward_type: string,
    progress: number
}

type Product = {
    ID: ID,
    name: string,
    returns: number,
    max: number,
    status: string,
    duration: number,
    description: string,
    tier: string
    order_limit: number
    image: string,
}

type Transactions = {
    ID: ID,
    type: string,
    name: string,
    amount: Amount,
    time: string,
    status: TransactionStatus
    description: string
    fees: Amount
    trackingID: string
    method: string
}

type TeamUser = User & {
    deposits: Amount
    commission: Amount
    downlines: number
    level: string
    refer: string
}

type Incentives = {
    ID: ID
    name: string
    referrals: number
    salary: Amount
    status: string
    level: string
    date: string
    bonusItem?: string
    isClaimed: boolean
}

type Mains = {
    user: User,
    wallet: Wallet,
    referral: {
        level1: TeamUser[],
        level2: TeamUser[],
        level3: TeamUser[],
        total_downlines: number,
        active_downlines: number,
        referral_deposits: Amount
    }
    products: Product[],
    user_investments: InvestmentOrder[],
    bonuses: Bonus[],
    transactions: Transactions[],
    active_investment: string,
    average_return: string
    controls: {
        minWithdrawal: Amount
        withFee: number
        minTransfer: Amount
        tranFee: number
    }
    incentives: Incentives[]
}

type CommonFetch = {
    userID: string
}

type Invest = CommonFetch & {
    prodID: ID
    amount: Amount
}

type ModifyAccount = {
    userID: string,
    email?: string,
    phone?: string,
    oldPassword?: string,
    newPassword?: string
    confirmPassword?: string,
}

type Transact = {
    userID: string,
    amount: Amount,
    account: string
    method: string
}

type DepositResponse = GeneralResponse & {
    trackingID?: string
}

type TransferFunds = Transact & {
    recipient: string
}

type WithdrawFunds = Transact & {
    pin: string
}

type VerificationRequest = {
    phone: string
    code?: string
}

type Coupon = & CommonFetch & {
    code: string
}

type ClaimEarnings = CommonFetch & {
    orderID: ID
}

type IncentivesApplication = CommonFetch & {
    name: string
    phone: string
    idNumber: string
    incentiveID: ID
}

type ForgotPasswordRequest = {
    phone: string
    code: string
    newPassword?: string
}

type claimBonus = CommonFetch & {
    bonusID: ID
}

type CheckSTKStatus = {
    trackingID: string
}

type CashoutWalletSetup = CommonFetch & {
    type: 'create' | 'update' | 'update_pin'
    phone: string
    accountName: string
    pin: string
}