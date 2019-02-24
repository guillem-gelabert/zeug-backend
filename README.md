# Zeug

Zeug is a Space Repetition mobile application developed to help users quickly memorize articles of the German language in a meaningful way. It uses frequency analysis and a modified version of the SuperMemo2 algorithm to optimally plan your study sessions. This repository contains only the backend, you can find the ReactNative frontend [here](https://github.com/guillem-gelabert/zeug)

### Getting started

1. Make sure that you have a SQL database installed and running. If you don't use MySQL you should change the dialect in `/config/config.json`.
2. Run the following commands:

```
npm install // install all dependencies

npm start // launches the server in node
npm run dev // launches the server using nodemon
```

### Tech Stack

- [Node.js](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [MySQL](https://www.mysql.com)

- [Sequelize](http://docs.sequelizejs.com/)

- SRS algorithm based in [SuperMemo](https://www.supermemo.com/en)
