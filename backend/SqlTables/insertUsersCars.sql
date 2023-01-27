DROP table users_cars

CREATE TABLE users_cars (
    car_id int NOT NULL PRIMARY KEY,
    car_fuel varchar(50),
    car_manufacturer varchar(50),
    car_model varchar(50),
    car_name varchar(50),
    car_type varchar(50)
)

select * from users_cars


INSERT INTO users_cars VALUES 
	(1,'Diesel','Nissan','PT Cruiser','Fiat Aventador','Convertible'),
	(2,'Gasoline','Maserati','Ranchero','Toyota Model S','Passenger Van'),
	(3,'Hybrid','Hyundai','A8','Lamborghini Jetta','SUV'),
	(4,'Hybrid','Mazda','Aventador','Mini Mustang','Crew Cab Pickup'),
	(5,'Diesel','Audi','Camry','Bentley 1','Convertible'),
	(6,'Electric','Tesla','Civic','BMW Impala','Hatchback'),
	(7,'Diesel','Mercedes Benz','Alpine','Fiat XC90','Coupe'),
	(8,'Hybrid','Ford','Jetta','Hyundai Colorado','Cargo Van'),
	(9,'Diesel','Honda','Mustang','Nissan Ranchero','Convertible'),
	(10,'Hybrid','Fiat','Prius','Smart Impala','SUV'),
	(11,'Gasoline','Aston Martin','Accord','Volvo Mustang','Passenger Van'),
	(12,'Hybrid','Polestar','Silverado','Ferrari CX-9','Wagon'),
	(13,'Gasoline','Audi','Element','Chrysler F-150','Convertible'),
	(14,'Hybrid','Ferrari','Altima','Porsche ATS','Cargo Van'),
	(15,'Gasoline','Aston Martin','Ranchero','Land Rover Escalade','Minivan'),
	(16,'Electric','Mini','Escalade','Nissan Mercielago','SUV'),
	(17,'Diesel','Fiat','Fortwo','Maserati Cruze','Hatchback'),
	(18,'Gasoline','Chrysler','Explorer','Nissan Sentra','Hatchback'),
	(19,'Gasoline','Honda','Impala','Hyundai Model 3','Convertible'),
	(20,'Hybrid','Mazda','A8','Volvo Grand Caravan','Wagon'),
	(21,'Diesel','Kia','Model T','Kia Cruze','Minivan'),
	(22,'Diesel','Kia','Impala','Fiat Model 3','Convertible'),
	(23,'Electric','Mazda','Spyder','Toyota Mustang','SUV'),
	(24,'Gasoline','Hyundai','Mercielago','BMW LeBaron','Hatchback'),
	(25,'Gasoline','Audi','Malibu','Volkswagen Countach','Convertible'),
	(26,'Gasoline','Jeep','Spyder','Bentley Silverado','Extended Cab Pickup'),
	(27,'Hybrid','BMW','Civic','Mazda Camry','Wagon'),
	(28,'Electric','Maserati','Impala','Hyundai Jetta','SUV'),
	(29,'Hybrid','Hyundai','Mustang','Maserati El Camino','Minivan'),
	(30,'Gasoline','Volkswagen','Beetle','Mazda Corvette','Convertible'),
	(31,'Hybrid','Mercedes Benz','LeBaron','Polestar Camaro','Extended Cab Pickup'),
	(32,'Hybrid','Land Rover','Jetta','Maserati 2','Crew Cab Pickup'),
	(33,'Diesel','Mini','Countach','Polestar Fortwo','Hatchback'),
	(34,'Electric','Ford','Fortwo','Polestar PT Cruiser','Passenger Van'),
	(35,'Diesel','Toyota','XC90','Audi Grand Cherokee','Sedan'),
	(36,'Gasoline','Maserati','Wrangler','Dodge Cruze','Minivan'),
	(37,'Gasoline','Honda','Civic','Ferrari ATS','Crew Cab Pickup'),
	(38,'Electric','Mazda','F-150','BMW Jetta','Coupe'),
	(39,'Diesel','Mini','LeBaron','Tesla Explorer','Hatchback'),
	(40,'Diesel','Smart','Colorado','Dodge Sentra','Minivan'),
	(41,'Diesel','Maserati','A8','BMW 2','Extended Cab Pickup'),
	(42,'Hybrid','Hyundai','Model 3','Nissan PT Cruiser','Sedan'),
	(43,'Diesel','Ferrari','Element','Tesla Explorer','Hatchback'),
	(44,'Diesel','Bugatti','Focus','Bentley Camry','SUV'),
	(45,'Diesel','Honda','CTS','Chevrolet Jetta','Convertible'),
	(46,'Diesel','Aston Martin','Altima','Bugatti CX-9','Extended Cab Pickup'),
	(47,'Diesel','Ford','F-150','Mercedes Benz Model S','Convertible'),
	(48,'Diesel','Volvo','1','Smart Challenger','Hatchback'),
	(49,'Gasoline','Audi','Golf','Mercedes Benz Beetle','Hatchback'),
	(50,'Hybrid','Porsche','Volt','Mini El Camino','SUV'),
	(51,'Electric','Maserati','Alpine','Volkswagen Corvette','Convertible'),
	(52,'Hybrid','Chevrolet','Durango','Lamborghini Expedition','Extended Cab Pickup'),
	(53,'Electric','Chrysler','Beetle','Mini Taurus','SUV'),
	(54,'Hybrid','Jaguar','Camry','Land Rover 2','Extended Cab Pickup'),
	(55,'Diesel','Tesla','XC90','Mini Land Cruiser','Convertible'),
	(56,'Hybrid','Mini','Civic','Bugatti Spyder','Sedan'),
	(57,'Electric','Mini','Charger','Mercedes Benz Impala','SUV'),
	(58,'Gasoline','Lamborghini','Colorado','Mazda Challenger','Crew Cab Pickup'),
	(59,'Electric','Mercedes Benz','Durango','Jeep Charger','Wagon'),
	(60,'Diesel','Bugatti','El Camino','Jeep Beetle','Coupe'),
	(61,'Diesel','Rolls Royce','Corvette','Mercedes Benz Volt','Hatchback'),
	(62,'Electric','Volkswagen','Model 3','Lamborghini Land Cruiser','Extended Cab Pickup'),
	(63,'Electric','Hyundai','Civic','Jaguar Land Cruiser','SUV'),
	(64,'Gasoline','Chrysler','F-150','Polestar XTS','Coupe'),
	(65,'Diesel','Ferrari','Ranchero','Bugatti A8','Hatchback'),
	(66,'Electric','Bugatti','CTS','Fiat Corvette','Sedan'),
	(67,'Electric','Dodge','Golf','Polestar CTS','Convertible'),
	(68,'Hybrid','Jaguar','Volt','Smart Model T','Crew Cab Pickup'),
	(69,'Diesel','Kia','Mustang','Volkswagen Countach','Crew Cab Pickup'),
	(70,'Diesel','Chrysler','Camry','Cadillac Grand Caravan','Wagon'),
	(71,'Diesel','Hyundai','El Camino','Nissan ATS','Coupe'),
	(72,'Gasoline','Ferrari','V90','Ford Mercielago','Cargo Van'),
	(73,'Gasoline','Dodge','Impala','BMW PT Cruiser','Extended Cab Pickup'),
	(74,'Gasoline','Fiat','Model 3','Lamborghini Challenger','Hatchback'),
	(75,'Hybrid','BMW','Model T','Mazda Charger','Convertible'),
	(76,'Gasoline','Land Rover','Charger','Honda Ranchero','Sedan'),
	(77,'Gasoline','Mini','Charger','Bentley Taurus','Sedan'),
	(78,'Hybrid','Mazda','Model S','Fiat Escalade','Convertible'),
	(79,'Diesel','Cadillac','V90','Mazda Corvette','SUV'),
	(80,'Hybrid','Bugatti','XC90','Land Rover CX-9','Convertible'),
	(81,'Hybrid','Porsche','A4','Cadillac Volt','Cargo Van'),
	(82,'Diesel','Ferrari','Colorado','Mercedes Benz V90','Crew Cab Pickup'),
	(83,'Gasoline','Ford','Expedition','Ferrari El Camino','Wagon'),
	(84,'Diesel','Polestar','Golf','Bentley CX-9','Hatchback'),
	(85,'Diesel','Bentley','El Camino','Aston Martin Durango','Coupe'),
	(86,'Electric','Volkswagen','Spyder','Polestar A8','Extended Cab Pickup'),
	(87,'Hybrid','Hyundai','Volt','Bentley 2','Coupe'),
	(88,'Gasoline','Cadillac','Land Cruiser','Lamborghini Escalade','Sedan'),
	(89,'Electric','Jaguar','Model 3','Audi A8','Wagon'),
	(90,'Diesel','Volkswagen','Altima','Smart Explorer','SUV'),
	(91,'Diesel','Rolls Royce','Model S','BMW A8','Minivan'),
	(92,'Diesel','Maserati','A4','Lamborghini Cruze','Wagon'),
	(93,'Gasoline','Land Rover','Alpine','Smart Wrangler','Wagon'),
	(94,'Gasoline','Chrysler','CTS','Nissan PT Cruiser','Hatchback'),
	(95,'Diesel','Bentley','Colorado','Honda Jetta','Crew Cab Pickup'),
	(96,'Gasoline','Toyota','A8','BMW PT Cruiser','Minivan'),
	(97,'Diesel','Smart','Escalade','Jaguar 1','Passenger Van'),
	(98,'Electric','Land Rover','A4','Maserati Volt','Wagon'),
	(99,'Gasoline','Dodge','Model 3','Kia Corvette','Hatchback'),
	(100,'Hybrid','Smart','Model 3','BMW CX-9','Extended Cab Pickup')