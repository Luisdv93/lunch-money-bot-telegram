import { Context, Markup, Telegraf, Telegram } from 'telegraf'
import { Update } from 'typegram'
import { config } from 'dotenv'
config()

import { botToken } from './env'
import api, { CATEGORIES } from './api'

const telegram: Telegram = new Telegram(botToken)

const bot: Telegraf<Context<Update>> = new Telegraf(botToken)

const chatId: string = process.env.CHAT_ID as string

bot.start(async (ctx) => {
  try {
    await api.get(CATEGORIES)
  } catch (error) {
    console.error('An error ocurred fetching the categories', error)
    ctx.reply('An error ocurred fetching the categories. Please try again later.')
  }

  ctx.reply(
    `Hello ${ctx.from.first_name}! I'm a bot that can help you to manage tasks for Lunch Money. For now I can only 
    create new transactions.`,
    Markup.inlineKeyboard([Markup.button.callback('Create a new transaction', 'createTransaction')])
  )
})

bot.action('createTransaction', (ctx) => {
  ctx.reply('Create transaction!!!')
})

bot.help((ctx) => {
  ctx.reply('Send /start to receive a greeting')
  ctx.reply('Send /keyboard to receive a message with a keyboard')
  ctx.reply('Send /quit to stop the bot')
})

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Context shortcut
  ctx.leaveChat()
})

bot.command('keyboard', (ctx) => {
  ctx.reply(
    'Keyboard',
    Markup.inlineKeyboard([
      Markup.button.callback('First option', 'first'),
      Markup.button.callback('Second option', 'second')
    ])
  )
})

bot.on('text', (ctx) => {
  ctx.reply('You choose the ' + (ctx.message.text === 'first' ? 'First' : 'Second') + ' Option!')

  if (chatId) {
    telegram.sendMessage(chatId, 'This message was sent without your interaction!')
  }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
