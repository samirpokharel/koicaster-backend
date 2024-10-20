
# Koicaster Backend

## Overview

**Description**: Koicaster is a powerful backend service tailored for streaming platforms, akin to StreamYard. It offers a comprehensive solution for live video streaming, allowing users to effortlessly broadcast high-quality content. Key features include:

- **Real-time Streaming**: Stream live video and audio with minimal latency for a seamless experience for both broadcasters and viewers.
- **Multi-Platform Integration**: Connect and stream to multiple platforms simultaneously, such as YouTube, Facebook, and Twitch.

### Table of Contents
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites
Before you begin, ensure you have the following software and tools installed:

- **Docker**: For developing, shipping, and running applications in containers. Installation instructions can be found in the [Docker installation guide](https://docs.docker.com/get-docker/).
- **Doppler CLI**: For managing and securely accessing your environment variables. Refer to the [Doppler documentation](https://docs.doppler.com/docs/install-cli) for installation instructions.

### Installation
1. **Clone the Repository**:
   First, clone the Koicaster backend repository to your local machine:
   ```bash
   git clone https://github.com/samirpokharel/koicaster-backend.git
   cd koicaster-backend
   ```

2. **Install Doppler**:
   - **For macOS**:
     ```bash
     brew install gnupg
     brew install dopplerhq/cli/doppler
     ```

   - **For Linux**:
     Download and run the installation script:
     ```bash
     chmod +x scripts/install-doppler.sh
     ./scripts/install-doppler.sh
     ```

   - **For Windows**:
     Follow the [Doppler CLI installation guide](https://docs.doppler.com/docs/install-cli) for Windows.

3. **Setup Doppler**:
   After installation, log in and set up Doppler:
   ```bash
   doppler login
   doppler setup
   ```

### Running the Project Locally
To start the Koicaster backend server, use the following command:
```bash
doppler run -- docker-compose up --build
doppler run -p koicaster-backed -c dev -- docker-compose up --build
```
This command builds the Docker images and starts the services defined in the `docker-compose.yml` file. 

Once running, access the backend at [http://localhost:5000](http://localhost:5000).

If you want to start the services without rebuilding, use:
```bash
doppler run dev  -- docker-compose up
doppler run -p koicaster-backed -c dev  -- docker-compose up
```

### Running the Project in Production
To start the Koicaster backend server in a production environment, use:
```bash
doppler run -- docker-compose -f docker-compose.prod.yml up -d --build
doppler run -p koicaster-backed -c prod -- docker-compose -f docker-compose.prod.yml up -d --build
```
This command builds the Docker images and starts the services defined in the `docker-compose.prod.yml` file.

Once running, you can access the backend at [http://api.koicaster.com](http://api.koicaster.com).

To start the services without rebuilding, use:
```bash
doppler run -- docker-compose -f docker-compose.prod.yml up
doppler run -p koicaster-backed -c prod -- docker-compose -f docker-compose.prod.yml up

```

## Architecture
(Provide a high-level overview of the architecture, including component interactions. Diagrams or flowcharts can enhance clarity.)

## API Documentation
(Detail your API endpoints, including methods, request parameters, and response formats. Consider using tools like Swagger or Postman for effective documentation.)

## Database Schema
(Provide an overview of the database schema, including entity relationships, tables, and relevant constraints.)

## Testing
To run tests for the project, ensure you have the necessary tools installed, and execute:
```bash
npm test
```

## Deployment
(Outline the deployment process, including recommended cloud platforms or services and necessary configurations.)

## Contributing
(Provide guidelines for contributing to the project, including instructions for submitting issues or pull requests.)

## Troubleshooting
(Offer solutions for common issues users may encounter during setup or while running the project.)

## License
(Include licensing information, such as the license under which the project is distributed.)

## Acknowledgments
(Recognize individuals or organizations that contributed to the project or inspired its development.)
