# Backend Setup

Django REST API for the articles application.

## Prerequisites

- Python 3.10+ (Preferable 3.14)
- pip
- If you are using `pyenv` the .python-version file will dictate the version

## Installation

1. From the root, navigate to the backend directory in your terminal:

```bash
cd backend
```

2. Create and activate virtual environment:

```bash
python -m venv venv

# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

1. Run migrations:

```bash
python manage.py migrate
```

2. Create a superuser (optional):

```bash
python manage.py createsuperuser
```

## Development

Start the development server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## Common Commands

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Collect static files
python manage.py collectstatic
```

## API Endpoints

- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `GET /api/articles/` - List articles
- `POST /api/articles/` - Create article
- `GET /api/articles/{id}/` - Get article detail
- `PUT /api/articles/{id}/` - Update article
- `DELETE /api/articles/{id}/` - Delete article

## Project Structure

- `backend/settings.py` - Django settings
- `backend/urls.py` - URL routing
- `venv/` - Virtual environment (not in version control)
