#!/bin/bash

#hostname=localhost

#if [ ! -f /etc/ssl/certs/localhost.pem ];  
#then    
#  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/localhost.key -out /etc/ssl/certs/localhost.pem -subj "/C=MX/ST=CDMX/L=Mexico/O=Security/OU=Development/CN=localhost"
#fi

nginx -c /etc/nginx/nginx.conf -g 'daemon off;'
