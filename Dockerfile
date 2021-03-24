FROM node:12
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
ENV dbUrl=mongodb+srv://HmJpNSRhHWMEaz65:HmJpNSRhHWMEaz65@cluster0.ur6so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE ${PORT}
CMD ["node","server.js"]