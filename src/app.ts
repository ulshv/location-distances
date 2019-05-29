import Koa from 'koa';
import Joi from 'joi';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

import mapApi from './map-api';
import { calculateResponse } from './locations';

dotenv.config();

const app = new Koa();
const validationSchema = Joi.array().min(2).max(200).items(Joi.string());

app.use(bodyParser());

app.use(async ctx => {
  if (ctx.method !== 'POST' || Joi.validate(ctx.request.body, validationSchema).error) {
    ctx.status = 400;
    ctx.body = 'You should make POST request and provide an array of locations (min=2, max=200)'
  } else {
    ctx.body = await calculateResponse(mapApi, ctx.request.body);
  }
});

app.listen(process.env.PORT || 3000);
