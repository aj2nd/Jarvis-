## Database Setup

This project uses PostgreSQL. To get started:

1. Install PostgreSQL and create your database.
2. Run the schema file to create all tables:

   ```bash
   psql -U yourusername -d yourdatabase -f db/schema.sql
   ```

3. (Optional) Use a database migration tool if you prefer automated migrations.

**Environment Variables:**  
Set your DB connection string in your `.env` file as `DATABASE_URL` or similar, according to your backend configuration.
