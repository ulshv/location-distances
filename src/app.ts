import Koa from 'koa';
import Joi from 'joi';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

import mapApi from './map-api';
import { calculateResponse } from './locations';

const app = new Koa();

app.use(bodyParser());
dotenv.config();

const schema = Joi.array().min(2).max(200).items(Joi.string().min(1).max(100));

app.use(async ctx => {
  const body = ctx.request.body;
  const validation = Joi.validate(body, schema);

  if (ctx.method !== 'POST' || validation.error) {
    ctx.status = 400;
    ctx.body = 'You should make POST request and provide an array of locations (min=2, max=200)'
  } else {
    ctx.body = await calculateResponse(mapApi, body);
  }
});

app.listen(process.env.PORT || 3000);
