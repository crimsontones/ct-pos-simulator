# CleverTap POS Simulator 

This project is designed to simulate integrating CleverTap with a Point-of-Sale (POS) teller system. The goal is to demonstrate how you can create user profiles and append transactions to CleverTap using a simple web interface. The backend Node.js server acts as a proxy to communicate with CleverTap's API, enabling profile creation and transaction logging.

## Features

- **Profile Check:** Search for an existing CleverTap user profile by identity (phone number or email).
- **Profile Creation:** Create a new user profile if none exists.
- **Transaction Logging:** Log purchase events to CleverTap for a specific user.

## Project Structure

- `public/`: Contains the front-end HTML and CSS files to interact with the POS simulator.
- `src/`: Contains the Node.js backend server code, which serves as a proxy to CleverTap.
- `server.js`: Main backend server file that handles profile checks, profile creation, and transaction logging with CleverTap.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/[ORG-NAME]/ct-pos-simulator.git
   cd clevertap-pos-simulator
   ```

2. Install Dependencies Run the following command in the root directory to install the necessary dependencies:
    ```bash
   npm install
    ```

The dependencies include:

- **Production Dependencies:**
    - `axios`: For making HTTP requests to CleverTap's API.
    - `cors`: To allow cross-origin requests from the front-end.
    - `express`: A lightweight Node.js web framework.
    - `dotenv`: To manage environment variables securely.

- **Development Dependencies:**
    - `nodemon`: To automatically restart the backend server when file changes are detected.
    - `npm-run-all`: To run both front-end and back-end servers in parallel.
    - `http-server`: To serve static files from the `public` directory.

## Configuration

1. **CleverTap Credentials**
   Rename `.env.sample` to `.env` in the root directory and add your CleverTap account ID and passcode:

    ```
    CLEVERTAP_ACCOUNT_ID=[YOUR_CLEVERTAP_ACCOUNT_ID]
    CLEVERTAP_PASSCODE=[YOUR_CLEVERTAP_PASSCODE]
    ```

## Running the Project

1. **Start the Servers** Run the following command to start both the front-end and back-end servers:

    
    npm start
    

This will:

- Start the front-end server at http://localhost:3000.
- Start the backend Node.js server at [http://localhost:8080](http://localhost:8080).

2. **Access the Front-End** Open your browser and navigate to http://localhost:3000 to access the POS interface.


## Usage

1. **Check for a Profile**

    - Enter an email or phone number in the identity input field.
    - Click "Check Profile". If a profile exists in CleverTap, the details will be displayed in the "Profile Details" section.
2. **Create or Update a Profile**

    - If no profile is found, fill out the profile details in the form.
    - Click "Create Profile" to create a new user in CleverTap.
3. **Log a Purchase**

    - Once a profile is created or found, you can log a purchase event by clicking "Log Purchase".
    - This will append a purchase transaction to the user's profile in CleverTap.

## Project Structure

- `public/`
    - `index.html`: Main HTML file for the front-end.
    - `styles.css`: CSS file for styling the front-end interface.
    - `scripts.js`: JavaScript file for front-end functionality and API requests.
- `src/`
    - `server.js`: Node.js server code to handle API requests to CleverTap.

## Known Issues

- If the backend server is not responding, ensure your CleverTap account ID and passcode are correctly set in `server.js`.
- Make sure the front-end server is running on port `3000` and the backend server on port `8080` to avoid any port conflicts.

## License

This project is open-source and available under the MIT License.