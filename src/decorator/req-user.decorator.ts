import { createParamDecorator } from '@nestjs/common';

export const ReqUser = createParamDecorator((data, req) => {
  if (Array.isArray(req)) {
    const [root, args, ctx, info] = req;
    return ctx.req.user;
  }
  return req.user;
});
