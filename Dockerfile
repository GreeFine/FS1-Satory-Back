FROM node

RUN npm install -g prisma
RUN npm install nodemon -g
WORKDIR /fs1-satory-back

CMD /bin/bash -c "prisma deploy && prisma generate && nodemon --inspect ./index.js"