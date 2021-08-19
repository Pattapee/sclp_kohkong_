// tslint:disable-next-line:max-line-length
import cors from 'cors';
import dotenv from 'dotenv';
import * as express from 'express';
import { writeFileSync } from 'fs';
import cron from 'node-cron';
import { APILineNotify } from './Services/APILineNotify'

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express.default();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:9000',
  preflightContinue: false,
};
app.use(cors(options))
app.use(express.json());

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await writeFileSync('./oldlength.txt', '0', 'utf8');
  // Init Valuue
  await APILineNotify.NotifyKohkonglotto().catch((e: any) => {
    console.error(e)
  });
  // Scraping Data
  cron.schedule('15 01 * * * *', async () => {
    await APILineNotify.NotifyKohkonglotto().catch((e: any) => {
      console.error(e)
    });
  });
  cron.schedule('15 16 * * * *', async () => {
    await APILineNotify.NotifyKohkonglotto().catch((e: any) => {
      console.error(e)
    });
  });
  cron.schedule('15 31 * * * *', async () => {
    await APILineNotify.NotifyKohkonglotto().catch((e: any) => {
      console.error(e)
    });
  });
  cron.schedule('15 46 * * * *', async () => {
    await APILineNotify.NotifyKohkonglotto().catch((e: any) => {
      console.error(e)
    });
  });
  // Alert timeout 3 min
  cron.schedule('00 * * * *', async () => {
    await APILineNotify.lastInital24Hour().catch((e: any) => {
      console.error(e)
    });
  });
  cron.schedule('15 * * * *', async () => {
    await APILineNotify.lastInital24Hour().catch((e: any) => {
      console.error(e)
    });
  });
  cron.schedule('30 * * * *', async () => {

    await APILineNotify.lastInital24Hour().catch((e: any) => {
      console.error(e)
    });
  });
  cron.schedule('45 * * * *', async () => {
    await APILineNotify.lastInital24Hour().catch((e: any) => {
      console.error(e)
    });
  });

});
