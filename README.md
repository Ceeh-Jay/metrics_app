# metrics_app

# CONSTRAINTS
    - You can only have one entry in storage at a time
        - New entry overrides existing data (this is because of the way the app has been designed)
    
# when there are no campaign in database requesting campaigns we report back that you do not have campaign data

# to test out the error messages/data validations from the backend, you can use tools like postman or insomnia (make GET or POST localhost:4000/api/campaigns)
    - However SQLite is dynamically typed, and performs only minimal data type checking. Expect to see only minimal checks if you did not instal 'Joi' package which handles validation at app level. However add them help with bugs associated with skipping to add values through Joi validation or request body.

# you can test our test our application as a unit but we are going to be spinning up two process/whatever to run our backend and frontend separately using with the help of concurrency package
    # steps
        #...

# explain the folder strucure
    - this is a simple app ...
    - we will use react for the frontend

# some app features
    - when you click on the "Retrieve and Calculate" button when there is no data to show, the app informs you
    -the app stors only one campaign data at a time. In other words it overrides the initial data if there is any