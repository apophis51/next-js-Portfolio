# docker build -t railwayflasktest .
# docker run -p 3000:3000 railwayflasktest


# Use the official Bun image as the base
FROM oven/bun:1 AS base


# Install CA certificates to ensure HTTPS works correctly
RUN apt update && apt install -y ca-certificates

# Switch to HTTPS for Debian repositories
RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|g' /etc/apt/sources.list
# Update package list and install Python
RUN apt update && apt install -y python3 build-essential

# Create a symbolic link for Python so node-gyp can find it
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Set the working directory
WORKDIR /app


# Copy the rest of the application code
COPY . .

# Install dependencies using Bun
RUN bun install


# ARG Strappi_SuperAccess
# ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# ARG CLERK_SECRET_KEY
# ARG DATABASE_URL
ARG MONGODB_CONNECTION_URL
ARG GEMINI_API_KEY
ARG OPENAI_API_KEY
ARG GROQAPI
ARG UNCENSORED_API_KEY
ARG ChromeExtentionWebSocketAdmin
ARG Strappi_SuperAccess
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG REACT_APP_RAPID_API_HOST
ARG REACT_APP_RAPID_API_KEY
ARG REACT_APP_RAPID_API_URL
ARG GOERLI_URL
ARG PRIVATE_KEY
ARG OPTIMISM_URL
ARG GOOGLE_EMAIL_PASS
ARG GOOGLE_EMAIL_USER
ARG ETHERIAL_USER
ARG ETHERIAL_PASS
ARG MAILGUN_USER
ARG MAILGUN_PASS
ARG MAILGUN_API_ID
ARG MAILGUN_API_KEY
ARG DATABASE_URL
ARG GITHUB_ID
ARG GITHUB_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG NEXTAUTH_SECRET
ARG NODEMAILER_USERNAME
ARG NODEMAILER_PASSWORD




# Build the application using Bun
RUN bun run build

EXPOSE 3000

# # delete if doesnt work
# ENV NODE_ENV=development 
# RUN npm run next-dev
# delete if doesnt work
ENV PORT 3000
# set hostname to localhost
# delete if doesnt work
ENV HOSTNAME "0.0.0.0"

# Run the application
CMD ["bun", "run", "start"]