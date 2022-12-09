# students-managment-system

You can see the app running here (feel free to add or delete as many entries as you want) ---> http://springbootreactfullstack-env.eba-jpkw9vrh.sa-east-1.elasticbeanstalk.com/

The motivation for this project was to work with technologies that are used in the real world to build real applications and to deploy to real users using real software development techniques and skills.

This is a web application where you can add, delete or modify a list of students, subjects and teachers and manage the reletions between them. It implements a Spring Boot Backend API with a PostgreSQL database with Docker, and React with AntDesign for the frontend. It uses Maven for the automation of the build and Docker with Jib for deployment. 

Please note that this is mostly a backend project, so not all API features are implemented fully in the frontend.

The application is tested using unitary and integration testing, the object-ralational mapping is achieved using Spring Data JPA & Hibernate and the app has full coverage of both client and server side error handling. 

Lastly, the app is deployed to AWS RDS & Elastic Beanstalk using a DockerHub image.


![diagram-spring-react](https://user-images.githubusercontent.com/68740477/204057318-24262d0e-fee1-43c4-9685-30ca0a573ddb.jpg)
