import { readFileSync, writeFileSync } from 'fs';
import * as _ from 'lodash';
import moment from 'moment';
import { ScrapingWeb } from './ScrapingWeb'

export class APILineNotify {
  public static NotifyKohkonglotto = async () => {
    let objDataKohkonglotto
    try {
      objDataKohkonglotto = await ScrapingWeb.getDataKohkonglotto()
    } catch (e: any) {
      console.error('1_APILineNotify')
      console.error(e)
    }
    const oldlength = await readFileSync('./oldlength.txt', 'utf8');
    while (objDataKohkonglotto.length.toString() === oldlength) {
      try {
        objDataKohkonglotto = await ScrapingWeb.getDataKohkonglotto()
      } catch (e: any) {
        console.error('2_APILineNotify')
        console.error(e)
      }
    }
    let message = `\n ð°Kohkong Lottoð°   \n`
    message += `âââââââ\n`
    const resultObj = await _.filter(objDataKohkonglotto, (value) => {
      return value.number > objDataKohkonglotto.length - 15
    })
    resultObj.map((value) => {
      message += `${value.time} â¡ï¸ ${value.data3} - ${value.data2}\n`
    })
    message += `âââââââ\n`
    message += `à¸à¸¥à¸£à¸­à¸à¸¥à¹à¸²à¸ªà¸¸à¸ ${resultObj[resultObj.length - 1].time} \n`
    message += `         ${resultObj[resultObj.length - 1].data3} - ${resultObj[resultObj.length - 1].data2} \n`
    message += `âââââââ\n`
    message += `line://ti/p/~0902824122`
    if (resultObj.length !== 0) {
      console.log(`Round: ${objDataKohkonglotto.length}`)
      console.log(moment(new Date()).format('L, HH:mm:ss'))
      const result = { name: '', data: '' };
      result.name = 'KohKongLotto'
      result.data = `${resultObj[resultObj.length - 1].data3} - ${resultObj[resultObj.length - 1].data2}`
      console.log(result)
      await APILineNotify.SendLineNotify(message)
      if (objDataKohkonglotto.length) {
        await writeFileSync('./oldlength.txt', String(objDataKohkonglotto.length), 'utf8');
      }
    }
  }

  public static lastInital24Hour = async () => {
    let message = `\nà¸«à¸¡à¸à¹à¸§à¸¥à¸² à¹à¸à¸à¸à¸à¹à¸§à¹à¸\n`;
    message += `à¸£à¸­à¸à¸¥à¸­à¸­à¸à¸­à¸µà¸ 3 à¸à¸²à¸à¸µ`;
    await APILineNotify.SendLineNotify(message)
  }

  public static SendLineNotify = async (message: string) => {
    const Notify_SDK = require('line-notify-sdk')
    const sdk = new Notify_SDK()
    // sdk.notify(process.env.TestForDev, message).catch((e: any) => {
    //   console.log('Catch: KK_Token');
    //   console.error(e)
    // });
    sdk.notify(process.env.KK_Token, message).catch((e: any) => {
      console.log('Catch: KK_Token');
      console.error(e)
    });
    sdk.notify(process.env.KK1_Token, message).catch((e: any) => {
      console.log('Catch: KK1_Token');
      console.error(e)
    });
    sdk.notify(process.env.KK2_Token, message).catch((e: any) => {
      console.log('Catch: KK2_Token');
      console.error(e)
    });
    sdk.notify(process.env.KK3_Token, message).catch((e: any) => {
      console.log('Catch: KK3_Token');
      console.error(e)
    });
    // sdk.notify(process.env.KK4_Token, message).catch((e: any) => {
    //   console.log('Catch: KK4_Token');
    //   console.error(e)
    // });
    sdk.notify(process.env.KK5_Token, message).catch((e: any) => {
      console.log('Catch: KK5_Token');
      console.error(e)
    });
    sdk.notify(process.env.KK6_Token, message).catch((e: any) => {
      console.log('Catch: KK6_Token');
      console.error(e)
    });
  }
}
