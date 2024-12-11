# myFitness

**myFitness** is a web application that allows users to save and track their daily exercises. It utilizes various modern libraries and frameworks including React, TanStack (React Query, React Form), and MongoDB to manage and store exercise data.

## Features
- Save daily exercise routines.
- View and track past exercises.
- Built with React, TanStack Query, and TanStack Form.
- Simple and easy-to-use interface for managing fitness routines.

## Tech Stack
- **Frontend**: React, TanStack Query, TanStack Form, React
- **Backend**: Node.js, MongoDB (via Mongoose)
- **Authentication**: Planned integration with Clerk (coming soon)
- **Database**: MongoDB

## Prerequisites

Before running the application, ensure you have the following:
- Node.js and npm installed
- A MongoDB database (can be set up using MongoDB URI in `.env`)

## Todo List

- Add a **Dockerfile** for users who don't want to create a MongoDB account manually.
- Integrate **Clerk** for user authentication (currently not working).
- Improve the **design** when time permits.
- add food calory
- add video 
---

### Explanation of Sections:

- **Project Title & Description**: The project name (`myFitness`) and a brief description of its purpose.
- **Tech Stack**: Lists the technologies you're using for both frontend and backend.
- **Prerequisites**: Provides the necessary setup information like MongoDB and Node.js/npm.
- **Installation**: Step-by-step instructions for setting up the project, including cloning the repo and setting up environment variables.
- **Running the Application**: A simple command to run both backend and frontend with `npm run dev`.
- **Todo List**: What you plan to add or improve, such as Docker support, Clerk auth, and design fixes.
- **License**: Specifies that the project is MIT-licensed.

---

Feel free to modify any part of it according to your preferences! Let me know if you need further adjustments or additions.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/myFitness.git
   cd myFitness
   npm i
   npm run dev


2. Create .env:
  
  ```bash
  MONGO_URI=your_mongo_uri
  PROT=your_port_number



