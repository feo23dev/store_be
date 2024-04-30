drop table if EXISTS category;
drop table if EXISTS company;
drop table if EXISTS products;
drop table if EXISTS users;
drop table if EXISTS password_change_history;


CREATE TABLE category(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);


INSERT INTO category (name) VALUES
('office'),
('livingroom'),
('kitchen'),
('bedroom'),
('dining'),
('kids')

SELECT * FROM category;



CREATE TABLE company(
id SERIAL PRIMARY KEY,
name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO company (name) VALUES
('ikea'),
('marcos'),
('liddy'),
('caressa')

SELECT * FROM company;


CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	price NUMERIC NOT  NULL,
	image TEXT,
	description TEXT,
	company_id INTEGER NOT NULL,
	category_id INTEGER NOT NULL,
	stok INTEGER NOT NULL,
	FOREIGN KEY (company_id) REFERENCES company(id),
	FOREIGN KEY (category_id) REFERENCES category(id)
);


SELECT * FROM products;

INSERT INTO products (name,price,image,description,company_id,category_id,stok) VALUES
('accent chair',25999,'https://www.course-api.com/images/store/product-1.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',2,1,22),
('albany sectional',109999,'https://www.course-api.com/images/store/product-2.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',3,2,12),
('albany table',309999,'https://www.course-api.com/images/store/product-3.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',3,3,54),
('armchair',12599,'https://www.course-api.com/images/store/product-4.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',2,4,25),
('dining table',42999,'https://www.course-api.com/images/store/product-5.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,5,9),

('emperor bed',23999,'https://www.course-api.com/images/store/product-6.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,4,32),

('entertainment center',59999,'https://www.course-api.com/images/store/product-7.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',4,2,5),

('high-back bench',39999,'https://www.course-api.com/images/store/product-8.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,1,45),

('leather chair',20099,'https://www.course-api.com/images/store/product-9.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',4,4,22),
('leather sofa',99999,'https://www.course-api.com/images/store/product-10.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',4,1,3),
('modern bookshelf',31999,'https://www.course-api.com/images/store/product-11.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',4,6,12),




('modern poster',3099,'https://www.course-api.com/images/store/product-12.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',3,2,35),
('shelf',30999,'https://www.course-api.com/images/store/product-13.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,2,40),
('simple chair',109999,'https://www.course-api.com/images/store/product-14.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',3,2,12),
('sofa set',129999,'https://www.course-api.com/images/store/product-15.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',2,2,4),
('suede armchair',15999,'https://www.course-api.com/images/store/product-16.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',4,1,12),
('utopia sofa',79999,'https://www.course-api.com/images/store/product-17.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',3,2,9),


('vase table',120999,'https://www.course-api.com/images/store/product-18.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',2,1,56),
('wooden bed',250099,'https://www.course-api.com/images/store/product-19.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,4,8),
('wooden desk',150999,'https://www.course-api.com/images/store/product-20.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,1,34),
('wooden desk',40099,'https://www.course-api.com/images/store/product-21.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',1,1,5),
('wooden table',234999,'https://www.course-api.com/images/store/product-22.jpeg','Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat',4,3,9)



CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

CREATE TABLE roles(
id SERIAL PRIMARY KEY,
role VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (role) VALUES('user'),('admin');

CREATE TABLE password_change_history (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES users(email)
);


CREATE OR REPLACE FUNCTION log_password_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO password_change_history (email) VALUES (NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE order_products (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantitiy INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  PRIMARY KEY (order_id,product_id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,  -- Auto-incrementing integer for the primary key
  fullname VARCHAR(255) NOT NULL,
  order_date TIMESTAMP NOT NULL,
  total_price NUMERIC NOT NULL,
  address VARCHAR(255),
  city VARCHAR(255),
  country VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  postal_code VARCHAR(20)
);




CREATE TRIGGER password_changed_trigger
AFTER UPDATE OF password ON users
FOR EACH ROW
WHEN (OLD.password IS DISTINCT FROM NEW.password)
EXECUTE FUNCTION log_password_change();



