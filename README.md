# Stock-Market
Technologies Used:
Spring-boot, Angular, Zuul, Eureka, MYSql

Front-End:
User Angular for developing the front end.
Steps to run the front-end:

1. Install angular cli
2. copy the project
3. Run npm install to install all the node modules
4. start the angular server using ng serve command

Steps to run Back-end:

1. Start the Eureka Discovery Service
2. Start all the other service, as Zuul proxy is used so the services will automatically start and will be accessible by using the application name in localhost:8761/**
3. ALl the micro-services need to be started before running the application.

The Excel should be uploaded in a particular format else it wont upload the Data to the Database, the format is given below

Date, Day Open, Day Close, Day High, Day Low, Volume Traded

and also these fields should be in the same sequence, else it is an error.
Also, Please dont give any spare or empty rows before the header field.

It uses a MySql database so the credentials need to be changed in all application.properties file of the microservices since all the microservices use Separater Database Entities.
