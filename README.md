# fitness-journal-backend

Fitness journal backend

1. Setup docker

- Setup a postgres database
- Setup redis database
- Setup pgAdmin

2. Require these information in .env

3. Run the backend

Running migrations from CLI
A migration file has been created to update database with exercise data
For more information
https://typeorm.io/#/migrations/

To create a migration
`typeorm migration:create`

To run latest migration
`typeorm migration:run`
