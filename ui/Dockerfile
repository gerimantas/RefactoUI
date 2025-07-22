FROM node:20
WORKDIR /app
COPY package.json ./
RUN npm install -D tailwindcss postcss autoprefixer
CMD [ "npx", "tailwindcss", "init", "-p" ]
