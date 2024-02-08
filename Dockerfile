# Use the official Node.js 20 image.
FROM node:20.9.0-alpine AS build-dist

WORKDIR /usr/src/app

COPY package.json ./

# RUN npm install --only=production
RUN npm install

COPY . .

RUN npm run build

# provide when building
ENV VITE_API_URL=http://localhost/api
ENV VITE_API_KEY=secrectKey

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-dist /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]