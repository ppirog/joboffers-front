FROM node:18.15.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/joboffers-front/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
