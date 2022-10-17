DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id serial primary key not null,
    item text not null,
    brand text not null,
    category text not null,
    image_url text not null,
    price decimal not null 
);

CREATE TABLE stock (
    id serial primary key not null,
    item_id int not null,
    color text not null,
    size int not null,
    stock_qty int not null,
    foreign key(item_id) references products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id serial primary key not null,
    item_id int not null,
    stock_id int not null,
    item text not null,
    color text not null,
    size int not null,
    order_qty int not null,
    price decimal not null,
    foreign key(item_id) references products(id) ON DELETE CASCADE,
    foreign key(stock_id) references stock(id) ON DELETE CASCADE
);
CREATE TABLE admin_details(
    id serial primary key not null,
    username VARCHAR(20) not null,
    user_password VARCHAR(20) not null
);
-- INSERT INTO admin_details
INSERT INTO admin_details (username,user_password) VALUES ('admin','admin8989');
-- INSERT INTO products
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Ivonia high heels','Ivonia','Women','https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',400.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Splendid formal shoe','Splendid','Men','https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',500.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Ivonia 2nd edition heel','Ivonia','Women','https://images.pexels.com/photos/1446524/pexels-photo-1446524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',350.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Superba sneaker','Superba','Men','https://images.pexels.com/photos/11962271/pexels-photo-11962271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',489.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Cloraine super woman','Cloraine','Women','https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',500.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Cloraine 2nd edition','Cloraine','Women','https://images.pexels.com/photos/10257094/pexels-photo-10257094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',400.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Rivonil heel','Rivonil','Women','https://images.pexels.com/photos/949590/pexels-photo-949590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Splendid 2 formal shoe','Splendid','Men','https://images.pexels.com/photos/2989593/pexels-photo-2989593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Kulca tekkies','Kulca','Men','https://images.pexels.com/photos/4429559/pexels-photo-4429559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',250.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Superba trainers','Superba','Women','https://images.pexels.com/photos/1750045/pexels-photo-1750045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Baby Json sneaker','Baby Json','Kids','https://images.pexels.com/photos/4987516/pexels-photo-4987516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',299.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Baby Json shoes','Baby Json','Kids','https://images.pexels.com/photos/8216701/pexels-photo-8216701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',199.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Rainbow kids sneaker','Rainbow','Kids','https://images.pexels.com/photos/6182563/pexels-photo-6182563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Rainbow 2 kids sneaker','Rainbow','Kids','https://images.pexels.com/photos/12955703/pexels-photo-12955703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Baby Json sliders','Baby Json','Kids','https://images.pexels.com/photos/8801134/pexels-photo-8801134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',200.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Big mark trainers','Big Mark','Men','https://images.pexels.com/photos/4997003/pexels-photo-4997003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',400.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Tonnies flexies','Tonnies','All','https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',250.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Baby Json wear','Baby Json','Kids','https://images.pexels.com/photos/267278/pexels-photo-267278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',100.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Tonnies flexies chillas','Tonnies','Men','https://images.pexels.com/photos/1122605/pexels-photo-1122605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Ivonia high heels 2','Ivonia','Women','https://images.pexels.com/photos/1161730/pexels-photo-1161730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',400.00);
INSERT INTO products (item,brand,category,image_url,price) VALUES ('Baby Json wear 2','Baby Json','Kids','https://images.pexels.com/photos/47220/shoes-pregnancy-child-clothing-47220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',300.00);

-- INSERT INTO stock
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (1,'Red',3,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (1,'Red',4,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (1,'Red',5,3);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (1,'Red',6,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (1,'Red',7,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (2,'Brown',4,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (2,'Brown',5,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (2,'Brown',6,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (2,'Brown',7,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (3,'Red',3,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (3,'Red',4,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (3,'Red',7,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (4,'Black',4,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (4,'Black',5,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (4,'Black',6,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (4,'Black',7,9);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (4,'Black',8,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (5,'White',3,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (5,'White',4,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (5,'White',6,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (5,'White',7,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (5,'White',8,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (6,'White',5,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (6,'White',6,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (6,'White',7,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (7,'Orange',5,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (7,'Orange',6,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (7,'Orange',7,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (7,'Orange',8,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (8,'Brown',5,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (8,'Brown',6,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (8,'Brown',7,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (8,'Brown',8,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (8,'Brown',9,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (8,'Brown',10,9);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (9,'White',5,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (9,'White',6,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (9,'White',7,11);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (9,'White',8,12);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (9,'White',9,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (9,'White',10,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (10,'Grey',4,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (10,'Grey',5,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (10,'Grey',6,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (10,'Grey',8,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (10,'Grey',9,3);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (11,'Blue',3,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (11,'Blue',4,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (12,'Blue',2,15);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (12,'Blue',3,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (13,'Mixed',4,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (13,'Mixed',5,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (13,'Mixed',6,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (14,'Mixed',4,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (14,'Mixed',5,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (14,'Mixed',6,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (15,'Pink',4,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (15,'Pink',5,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (15,'Pink',6,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (16,'Orange',5,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (16,'Orange',6,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (16,'Orange',7,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (16,'Orange',8,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (16,'Orange',9,11);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (17,'Blue',4,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (17,'Blue',5,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (17,'Blue',6,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (17,'Blue',7,9);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (17,'Blue',8,8);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (17,'Blue',9,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (18,'Black and white',2,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (18,'Black and white',3,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (19,'Black and white',5,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (19,'Black and white',6,12);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (19,'Black and white',7,9);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (19,'Black and white',8,6);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (19,'Black and white',9,7);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (20,'Black',4,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (20,'Black',5,4);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (20,'Black',6,3);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (20,'Black',7,5);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (20,'Black',8,2);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (21,'Military green',2,10);
INSERT INTO stock (item_id,color,size,stock_qty) VALUES (21,'Military green',3,5);





