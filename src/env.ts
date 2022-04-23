export const botToken: string = process.env.BOT_TOKEN as string

if (botToken === undefined || typeof botToken !== 'string' || botToken === '') {
  throw new Error('BOT_TOKEN must be provided and be a valid string!')
}

export const lunchMoneyToken: string = process.env.LUNCH_MONEY_TOKEN as string

if (lunchMoneyToken === undefined || typeof lunchMoneyToken !== 'string' || lunchMoneyToken === '') {
  throw new Error('LUNCH_MONEY_TOKEN must be provided and be a valid string!')
}

export const lunchMoneyUrl: string = process.env.LUNCH_MONEY_URL as string

if (lunchMoneyUrl === undefined || typeof lunchMoneyUrl !== 'string' || lunchMoneyUrl === '') {
  throw new Error('LUNCH_MONEY_URL must be provided and be a valid string!')
}

export default {
  botToken,
  lunchMoneyToken,
  lunchMoneyUrl
}
