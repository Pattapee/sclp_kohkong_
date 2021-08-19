import axios from 'axios';
import cheerio from 'cheerio';
import * as _ from 'lodash';
import moment from 'moment';

export class ScrapingWeb {

  public static getDataKohkonglotto = async () => {
    const https = require('https')
    const url = 'https://kohkonglotto.com/';
    const AxiosInstance = axios.create(
      {
        baseURL: url,
        timeout: 30000,
        withCredentials: true,
        httpsAgent: new https.Agent({ keepAlive: true }),
        headers: { 'Content-Type': 'application/json' }
      });
    const html = await AxiosInstance.get(url)
    const $ = cheerio.load(html.data);
    const statsTable = $('#ContentPlaceHolder1_divPingpong').find('.linedash').text();
    const result = await _.split(_.join(_.words(statsTable), ''), 'น')
    result.splice(0, 2)
    let strdata = ''
    result.map((value) => {
      strdata += value.substring(0, 5)
    })
    return await ScrapingWeb.splitResult24Hour(strdata)
  }

  public static splitResult24Hour = async (result: string) => {
    let count = 0
    const obj = []
    for (let i = 0; i < 96; ++i) {
      const data3 = result.substring(count, count + 3)
      const data2 = result.substring(count + 3, count + 5)
      if (data3 && data3 !== 'xxx') {
        obj.push({
          data3,
          data2,
          number: i + 1,
          time: moment('23:59:00', 'HH:mm').add(15 * i + 1, 'm').format('HH:mm')
        })
        count += 5
      }
    }
    return obj
  }

}
