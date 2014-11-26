FROM ubuntu:14.04
MAINTAINER Ryan Ploetz <ryan.ploetz@gmail.com>
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN apt-add-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs
COPY ./meteor-famous-threejs.tar.gz /meteor-famous-threejs.tar.gz
RUN tar -zxvf meteor-famous-threejs.tar.gz
RUN sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
RUN cd /bundle/programs/server; npm install
EXPOSE 8080
ENV PORT 8080
#ENV ROOT_URL http://192.168.59.103
ENV MONGO_URL mongodb://127.0.0.1:3001/meteor
CMD ["nodejs", "/bundle/main.js"]

# export MongoDB info to an environ var
