FROM node:16-alpine 
WORKDIR /pokeapi-client
COPY . .
#npm ci makes sure the exact versions in the lockfile gets installed
RUN npm ci 
RUN npm run build
EXPOSE 3000
CMD [ "npx", "serve", "dist" ]
