create table notifications ( 
id int(6) unsigned not null auto_increment,
groupId int(11) not null,
userId int(6) unsigned not null,
createdAt date not null,
details varchar(255) default null,
`type` varchar(60) not null, 
primary key (id), 
constraint FKG foreign key(groupId) references `groups` (id), 
constraint FKU foreign key (userId) references `users` (id)  )
ENGINE InnoDB Default charset=utf8;