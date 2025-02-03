###################
# PRODUCTION
###################

FROM node:19-slim As production

RUN apt-get update
RUN apt-get install -y openssl

ENV NODE_ENV=production


WORKDIR /code
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock

COPY ./dist /code/dist
COPY ./prisma /code/prisma
COPY ./rsa_sign_mcd_live_2048_priv.pem /code/rsa_sign_mcd_live_2048_priv.pem

RUN yarn install --frozen-lockfile
RUN npx prisma generate

EXPOSE 3000

CMD [ "node", "dist/main.js" ]