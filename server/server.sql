create table users(
id int(11) NOT NULL AUTO_INCREMENT,
fullName varchar(255) NOT NULL,
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
age varchar(255) NOT NULL,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;