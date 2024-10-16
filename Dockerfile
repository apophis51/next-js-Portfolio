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

# delete if doesnt work
ENV NODE_ENV=development

# Build the application using Bun
RUN bun run build

EXPOSE 3000

 
# RUN npm run next-dev
# delete if doesnt work
ENV PORT 3000
# set hostname to localhost
# delete if doesnt work
ENV HOSTNAME "0.0.0.0"

# Run the application
CMD ["bun", "run", "start"]