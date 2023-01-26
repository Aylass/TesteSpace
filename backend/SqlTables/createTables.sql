CREATE TABLE users_cars (
    car_id int NOT NULL PRIMARY KEY,
    car_fuel char,
    car_manufacturer char,
    car_model char,
    car_name char,
    car_type char,
);

CREATE TABLE users_products_buyed (
    user_product_buyed_id int NOT NULL PRIMARY KEY,
    user_product_buyed_appliance char,
    user_product_buyed_business_industy char,
    user_product_buyed_business_technology char,
    user_product_buyed_commerce_department char,
    user_product_buyed_company_name char,
    user_product_buyed_product_name char,
    user_product_buyed_product_description char,
    user_product_buyed_product_material char,
    user_product_buyed_product_price float,
);

CREATE TABLE users_address (
    user_address_id int NOT NULL PRIMARY KEY,
    user_address_street_address char,
    user_address_street_name char,
    user_address_street_sufix char,
    user_address_city char,
    user_address_city_prefix char,
    user_address_secondary_address char,
    user_address_address_direction char,
    user_address_state char,
    user_address_country char,
);

CREATE TABLE users_access (
    user_access_id int NOT NULL PRIMARY KEY,
    user_access_business_technoloy char,
    user_access_ip_address char,
    user_access_mac_address char,
    user_access_user_agent char,
    user_access_login char,
);

CREATE TABLE users_job (
    user_job_id int NOT NULL PRIMARY KEY,
    user_job_title char,
    user_job_address char,
    user_job_salary float,
    user_job_salary_currency_symbol char,
);

CREATE TABLE users (
    user_id int NOT NULL PRIMARY KEY,
    user_first_name char,
    user_birth_date date,
    user_access_id int NOT NULL FOREIGN KEY REFERENCES users_access(user_access_id),
    user_address_id int NOT NULL FOREIGN KEY REFERENCES users_address(user_address_id),
    user_job_id NOT NULL FOREIGN KEY REFERENCES users_job(user_job_id),
    user_product_buyed_id NOT NULL FOREIGN KEY REFERENCES users_products_buyed(user_product_buyed_id),
    user_car_id NOT NULL FOREIGN KEY REFERENCES users_cars(car_id),
    status boolean
);