FROM node:18-alpine AS base

# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

WORKDIR /app

# COPY ["package.json", "package-lock.json*", "./"]
COPY . .


RUN npm i



EXPOSE 3000

ENV NODE_ENV=development
# RUN npm run next-dev

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# default command when container starts
CMD ["npm", "run", "next-dev"] 



# syntax=docker/dockerfile:1

