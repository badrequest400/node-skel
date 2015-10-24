
FROM centos
MAINTAINER Balazs Cseh

# INSTALL NODE.JS
RUN yum -y install wget
RUN wget http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
RUN rpm -ivh epel-release-7-5.noarch.rpm

RUN yum install -y --enablerepo=epel nodejs npm
RUN npm install -g forever

# ADD SOURCE FILES
ADD ./* /srv/
WORKDIR /srv

# INSTALL DEPENDENCIES
RUN npm install --production

# EXPOSE PORTS
EXPOSE 3000

CMD ["node", "/srv/server.js"]
