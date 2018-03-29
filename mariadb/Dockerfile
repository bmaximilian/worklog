FROM mariadb:10.3

RUN mkdir -p /restore

COPY mysqld.conf /etc/mysql/mysql.conf.d/mysqld.cnf
COPY ./dump /docker-entrypoint-initdb.d