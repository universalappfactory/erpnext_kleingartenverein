# Writing Tests

 We stick to python unittest for unit/integrationtests
 And all tests are located in the tests subdirectory in order to use the Visual Studio Code test explorer.

 # Crate a test db from scratch

 ```
bench new-site testing.localhost
bench --site testing.localhost install-app payments
bench --site testing.localhost install-app erpnext
bench --site testing.localhost install-app erpnext_kleingartenverein
 ```

1. Setup Erpnext

```
# within /workspace/development/frappe-bench
bench use testing.localhost


# launch app and point your browser to 

http://localhost:8000/app

# follow the setup wizard
```



 # Running tests

 When the database is set up correctly you can run the tests in the Visual Studio Code Testexplorer 


 # TestDB Credentials

 Administrator - 123

 Test User
 Test - test

# Predefind documents in the TestDb

- TestCustomer
- TestCompany
- TestProduct

- A sales invoice containing TestProduct