Admin Panel
Project Overview
This project is a backend application designed for managing and interacting with admin, manager and employee data. It includes functionalities for user authentication, project management, and employee assignment.

Table of Contents:
Technologies Used, 
Setup Instructions, 
API Endpoints, 
Postman Testing, 
Contributing 

Technologies Used:
Node.js, 
Express, 
Sequelize (ORM for PostgreSQL), 
PostgreSQL, 
Bcrypt for password hashing, 
JWT for authentication, 
Setup Instructions, 
Clone the Repository: 

bash
Copy code: 
git clone https://github.com/your-username/mayank-admin-panel.git
Navigate to the Project Directory:

bash
Copy code: 
cd mayank-admin-panel
Install Dependencies:

bash
Copy code: 
npm install
Set Up Environment Variables:

Create a .env file in the root directory and add the following variables:

env
Copy code
PORT=3033 
DATABASE_URL=your-database-url 
JWT_SECRET=your-jwt-secret 
NODE_ENV=production 
Run Migrations: 

bash
Copy code: 
npx sequelize-cli db:migrate
Start the Application:

bash
Copy code: 
npm start
API Endpoints
Authentication
Sign Up

POST /auth/signup
Login

POST /auth/login
Project Management
Get Projects

GET /projects
Assign Employee to Project

POST /projects/:id/assign-employee
Postman Testing
Below are screenshots of the Postman collection used to test the API endpoints:

Authentication
Sign Up Request:
![Screenshot (788)](https://github.com/user-attachments/assets/f3ef3b85-ecd1-4e6d-9b3f-80099447b0ee)


Login Request:
![Screenshot (789)](https://github.com/user-attachments/assets/0ffc77a1-ed61-411f-84da-dadbf0b7304e)

Project Management
Create Projects :
![Screenshot (795)](https://github.com/user-attachments/assets/1eb71780-6118-4803-acde-e3dee879d001)


Assign Manager/Employee to Project :
![Screenshot (796)](https://github.com/user-attachments/assets/466262b1-e971-4383-96ec-84671b7270ac)


For a complete Postman collection, refer to the Public Collection. https://www.postman.com/planetary-moon-727074/workspace/admin-pannel-testing

Contributing
Feel free to open an issue or submit a pull request if you have any suggestions or improvements.
