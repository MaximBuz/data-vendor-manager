release: python manage.py makemigrations --noinput
release: python manage.py migrate --noinput

web: gunicorn backend_api.wsgi