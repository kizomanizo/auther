# Auther

For mobile application use in Authentication and administration of users and their access rights.

### To get started ###
start the API by running te nodemon command (optionally as an NPX command):
`npx nodemon start`

Once the API has started, proceed to creade an initial dummy user that you'll have to disable or update before going for production. The dummy user can be create without any JWT Tokens using the following JSON as a POST to to `your_url/api/v1/admin`

```{
    "firstname": "Admin",
    "middlename": "First",
    "lastname": "User",
    "email": "admin@example.com",
    "password": "admin",
    "joinDate": "2018-01-01",
    "phone": "+255755123456",
    "level": "admin"
}```