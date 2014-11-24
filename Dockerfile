FROM ubuntu:14.04
MAINTAINER Ryan Ploetz <ryan.ploetz@gmail.com>
RUN apt-get update
RUN apt-get install -y nodejs npm g++ make
COPY ./meteor-famous-threejs.tar.gz /meteor-famous-threejs.tar.gz
RUN tar -zxvf meteor-famous-threejs.tar.gz
#RUN cd /bundle/programs/server; npm install
#EXPOSE 3000

# export MongoDB info to an environ var
