# Stage 1: Build fims web app
FROM ubuntu:18.04 as node

ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8 

ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1

# Update distro and install some packages
RUN export DEBIAN_FRONTEND=noninteractive && \ 
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install locales locales-all -y && \
    apt-get install --no-install-recommends -y openssl ruby ruby-dev python-setuptools build-essential \
    python-testtools python-nose python-pip vim curl supervisor logrotate locales tzdata telnet \
    && localedef -i es_MX -c -f UTF-8 -A /usr/share/locale/locale.alias es_MX.UTF-8 \    
    && ln -fs /usr/share/zoneinfo/America/Mexico_City /etc/localtime \
	&& dpkg-reconfigure --frontend noninteractive tzdata \
	&& mkdir -p /etc/ssl/certs/ \	
    && dpkg-reconfigure locales \
    && apt-get clean all 

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash && apt-get install -y nodejs git \ 
    && npm -v \ 
    && apt-get clean all \ 
    && rm -rf /var/lib/apt/lists/* 

ENV LANG es_MX.utf8

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .


RUN npm install 

RUN ng build --prod && \  
    cd dist/originacion/  && \  
    rm -Rf ../../firebase/public/*  && \  
    cp -Rf * ../../firebase/public/


RUN cd firebase && npm install -g firebase-tools && \ 
    firebase deploy --token "1//0fuHSWkfPufAQCgYIARAAGA8SNwF-L9Ir5YkizcWlYOmmeqmr6QrAD9b1h6pAjk8KqXVbGKpB_YYi70Ql4p8LQgm1CTzLQ-cN_8c"

# Stage 2: Host Fims web app on Nginx
FROM nginx:1.17.9

ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8 

# Update distro and install some packages
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install locales locales-all -y && \
    apt-get install --no-install-recommends -y openssl python-setuptools python-testtools python-nose python-pip vim curl supervisor logrotate locales  telnet && \
    update-locale LANG=C.UTF-8 LC_MESSAGES=POSIX && \
    locale-gen es_MX.UTF-8 \
    && ln -fs /usr/share/zoneinfo/America/Mexico_City /etc/localtime \
	&& dpkg-reconfigure --frontend noninteractive tzdata \
	&& mkdir -p /etc/ssl/certs/ \	
    && dpkg-reconfigure locales \
    && apt-get clean all && \ 
    rm -rf /var/lib/apt/lists/*

COPY --from=node /usr/src/app/dist/originacion/ /usr/share/nginx/html

WORKDIR /etc/nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./options-ssl-nginx.conf /etc/nginx/options-ssl-nginx.conf

COPY nginx.sh /opt/nginx.sh  

RUN chmod +x /opt/nginx.sh

VOLUME ["/etc/ssl/certs"]

EXPOSE 61616

CMD ["/opt/nginx.sh"]