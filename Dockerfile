FROM node

RUN npm install -g prisma
RUN npm install nodemon -g
WORKDIR /fs1-satory-back

CMD /bin/bash -c "npm install && prisma deploy && nodemon --inspect ./src/index.js"
