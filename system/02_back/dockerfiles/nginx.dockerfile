FROM nginx:stable-alpine
 
WORKDIR /etc/nginx/conf.d
 
COPY nginx/nginx.conf .
 
RUN mv nginx.conf default.conf

WORKDIR /var/www/html
 
COPY project .

#EXPOSE 3000
#CMD [ "node", "app.js" ]