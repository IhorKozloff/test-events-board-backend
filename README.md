# Getting Started with Event-board server.
This project was launched remotely using this link https://test-events-board-backend.onrender.com
## Available routes:
1. /api/events - returns an object with an array of events, and the property of the total number of events. It accepts as query parameters:
- limit - number of events in the array per request (any number).
- offset - the number of events that should be skipped from the total number found in the database. This is done for pagination(any number).
- sortBy, sortDirection - sort params. sortBy may be only ('title', 'description', 'eventDate', 'organizer'), sortDirection(1, -1).


     Response Example:
     ```
     {"events":[{"title":"The Healthcare Innovation Congress","description":"The only event that delivers impactful content, creates real connections, drives healthcare forward.","organizer":"The Healthcare Innovation Company","eventDate":"2024-02-18T22:00:00.000Z","id":"6644a8f07063c66a90613c45","available_status":"expired"}],"total_count_events":37}
     ```
     
2. /api/events/:id - returns extended information about any event to the corresponding passed ID
   
     Response Example:
     ```
     {"title":"The Healthcare Innovation Congress","description":"The only event that delivers impactful content, creates real connections, drives healthcare forward.","organizer":"The Healthcare Innovation Company","eventDate":"2024-02-18T22:00:00.000Z","id":"6644a8f07063c66a90613c45","subscribers":[{"name":"Ihor","email":"ik.123@gmail.com"},{"name":"Tony Stark","email":"1@gmail.com"},{"name":"Peter Parker","email":"2@gmail.com"},{"name":"Stephen Strange","email":"3@gmail.com"}]}
     ```
4. /api/subscribe - route for registering a user for a specific event, returns information about the user
   
     Response Example:
     ```
     {
      "name": "Habapentina Mosley",
      "email": "qwerty@gmail.com",
      "subscribed_events_ids": [
          "6644a8f07063c66a90613c45"
      ],
      "id": "664b2567e9903a0b7be200d9"
    }
     ```
## If you want launch server localy..
1. Dowload files from this repo.
2. Create in root directory environment vars file ".env". In this file you need make 3 env vars.
   - DATABASE_URL (url for you database connection)
   - DATABASE_TEST_URL (url for you tests database connection)
   - PORT (port)
  
     If you dont have or you dont know what is this, you can use my. Just copy code below in you .env file.
     ```
     DATABASE_URL=mongodb+srv://eyeshield21:112212qw@cluster0.6nmjspu.mongodb.net/db-events-board?retryWrites=true&w=majority&appName=Cluster0
     DATABASE_TEST_URL=mongodb+srv://eyeshield21:112212qw@cluster0.6nmjspu.mongodb.net/db-events-board-tests?retryWrites=true&w=majority
     PORT=3001
     ```
3. Build project
   ```
   npm run build
   ```
4. Start project
   ```
   npm start
   ```
   or, if you want to develop project

   ```
   npm run dev
   ```

## If you want to run tests...
   1. Use script to run tests
   ```
   npm run test
   ```

## Good luck, and nice coding :)
