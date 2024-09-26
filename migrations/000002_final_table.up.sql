CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username varchar(100) NOT NULL UNIQUE,
    hashed_password varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    token_verification CHAR(36)
);

ALTER TABLE courses
ADD COLUMN topic VARCHAR(100) DEFAULT NULL;