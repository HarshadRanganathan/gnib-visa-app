FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY conf/docker.conf /etc/nginx/conf.d
COPY public /home/gnib-visa-app/public