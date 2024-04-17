# Resume Optimizer Backend Prototype

This is the backend prototype for the Resume Optimizer project.

## Prerequisites

- Python 3.9.4 or higher

## ENV VARIABLES
OPENAI_API_KEY=####

## Running app via docker

1. Build image
```terminal
docker build -t backend:latest .
```
2. Run container
```terminal
docker run -p 5002:5000 -d --name backendcontainer --env-file ./.env backend:latest
```

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Resume-Optimizer-Backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Resume-Optimizer-Backend
    ```

3. Create a virtual environment:

    ```bash
    python -m venv .venv
    ```

4. Activate the virtual environment:

    - For macOS/Linux:

      ```bash
      source .venv/bin/activate
      ```

    - For Windows:

      ```bash
      .venv\Scripts\activate
      ```

5. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

## Running the Flask App
1. Simple
```bash
python app.py
```
OR
1. Set the Flask app environment variable:

    - For macOS/Linux:

      ```bash
      export FLASK_APP=app.py
      ```

    - For Windows (PowerShell):

      ```bash
      $env:FLASK_APP = "app.py"
      ```

2. Run the Flask app:

    ```bash
    flask run
    ```

    The app will be accessible at `http://localhost:5000`.

## License

This project is licensed under the [MIT License](LICENSE).