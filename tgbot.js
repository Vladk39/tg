const TelegramBot = require('node-telegram-bot-api');
const solanaWeb3 = require('@solana/web3.js');

const botapi = "7099849486:AAGzdRgcYZN1xTzmLUrzzW6ReR9kenJSWq8";
const bot = new TelegramBot(botapi, {polling: true});

// массив разрешенных юзеров.
const allowedUsers =['@vlad_pangolier', '@alexsharypin']


// коннект к солане, можно поменять рпц
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');



bot.on('text', async msg => {
    const username = msg.from.username ? `@${msg.from.username}` : null;
    console.log(`Сообщение от пользователя: ${username}`);
        console.log(msg.text);
        
    if (!allowedUsers.includes(username)) {
        await bot.sendMessage(msg.chat.id, 'пошел нахуй');
        return;
    }


    if(msg.text == '/start') {

        await bot.sendMessage(msg.chat.id, `you're on your way`, {   
            reply_markup: {    
                keyboard: [   
                    ['StartParce', 'filter be volume'],
                    ['⭐️ filter reset', '⭐️ check open dca'],
                    ['testbtn', 'testbtn2'],
                    ['closemenu']
                    ],
                resize_keyboard: true
            }    
        })    
    } else if(msg.text == 'closemenu'){
        // закрытие меню
        await bot.sendMessage(msg.chat.id, '...',{
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else if(msg.text == 'StartParce'){
        


    } else if(msg.text == 'filter be volume'){
        


    } else if(msg.text == 'у'){
        


    } else if(msg.text == 'testbtn'){
        const chatId = msg.chat.id;

        // Спрашиваем у пользователя сигнатуру транзакции
        await bot.sendMessage(chatId, 'Введите сигнатуру транзакции:');
        
        // Следим за следующим сообщением от пользователя с сигнатурой
        bot.once('text', async (msgWithSignature) => {
            const signature = msgWithSignature.text;

            try {
                
                const transaction = await connection.getTransaction(signature, { maxSupportedTransactionVersion: 0 });

                if (transaction) {
                    //атвет\
                    const transactionInfo = `
                        Pre-Balances: ${transaction.meta.preBalances}
                        Post-Balances: ${transaction.meta.postBalances}
                    `;
                    await bot.sendMessage(chatId, `Информация о транзакции:\n${transactionInfo}`);
                } else {
                    await bot.sendMessage(chatId, 'Транзакция не найдена.');
                }
            } catch (error) {
                console.error('Ошибка при получении информации о транзакции:', error);
                await bot.sendMessage(chatId, 'Произошла ошибка при получении информации о транзакции.');
            }
        });
    



    }

})


// {
//     message_id: ID_СООБЩЕНИЯ,
//     from: {
//       id: ID_ПОЛЬЗОВАТЕЛЯ,
//       is_bot: false,
//       first_name: ИМЯ_ПОЛЬЗОВАТЕЛЯ,
//       username: НИК_ПОЛЬЗОВАТЕЛЯ,
//       language_code: 'ru'
//     },
//     chat: {
//       id: ID_ЧАТА,
//       first_name: ИМЯ_ПОЛЬЗОВАТЕЛЯ,
//       username: НИК_ПОЛЬЗОВАТЕЛЯ,
//       type: 'private'
//     },
//     date: 1686255759,
//     text: ТЕКСТ_СООБЩЕНИЯ,
//   }