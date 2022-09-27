import { Context, Telegraf } from 'telegraf'
import getBotTokenOrQuit from './util/getBotToken';

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)

const btsMembers: ('jungkook'|'taehyung')[] = ['jungkook', 'taehyung']

const btsImages: {[id: string]: string} = {
    namjoon: 'https://ibighit.com/bts/images/bts/discography/dynamite/ZPmNP49sWARVDfpYubmDxfry.jpg',
    seokjin: 'https://ibighit.com/bts/images/bts/discography/dynamite/yxFooutic8ocblB4HKtQXtnL.jpg',
    yoongi: 'https://ibighit.com/bts/images/bts/discography/dynamite/4qEoQbLB4DKdVoms8nAotKn5.jpg',
    hoseok: 'https://ibighit.com/bts/images/bts/discography/dynamite/7PKOf7Yi5MBs5D7DD3qDz7lA.jpg',
    jimin: 'https://ibighit.com/bts/images/bts/discography/dynamite/gDnM0f8B2AORLVa6jFaCjnk6.jpg',
    taehyung: 'https://ibighit.com/bts/images/bts/discography/dynamite/tKPiBftDVZxNmXFLqgykp9Sk.jpg',
    jungkook: 'https://ibighit.com/bts/images/bts/discography/dynamite/eFupxLF4IQMBuodtS4YqWMx6-m.jpg',
}

bot.start((ctx) => ctx.reply("Hello!  Let's talk (about kpop)!"))
bot.help((ctx) => ctx.reply('Here are the commands for this bot:\nhello\nsing\necho\nbts'))
bot.hears('hello', (ctx) => ctx.reply('Ok, I heard you say hello'))
bot.command('sing', (ctx) => ctx.reply('La la la!  I got your command.'))
bot.command('kpop', (ctx) => ctx.reply('kpop'))
bot.command('echo', (ctx) => ctx.reply(ctx.message.text))
bot.command('bts', (ctx) => {try {
    if (ctx.message.text.split(' ').length > 1) {
        const searchTerm: string = ctx.message.text.split(' ').slice(1).join(' ');
        if (btsImages.hasOwnProperty(searchTerm)) {
                ctx.replyWithPhoto(btsImages[searchTerm]);
        } else {
            ctx.reply('No bts image with that search term! Try /bts to get a list of commands!')
        }
    } else {
        ctx.reply('Try the following:\n/bts namjoon\n/bts seokjin\n/bts yoongi\n/bts hoseok\n/bts jimin\n/bts taehyung\n/bts jungkook');
    }
} catch (error) {
    console.error(error);
} })
bot.hears(/kpop/gi, (ctx) => ctx.reply('Did someone mention kpop?'));
bot.hears(/weather/gi, (ctx) => ctx.reply('Did someone mention the weather?'));
bot.hears(/namjoon/gi, (ctx) => ctx.replyWithPhoto(btsImages.namjoon));
bot.hears(/seokjin/gi, (ctx) => ctx.replyWithPhoto(btsImages.seokjin));


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
