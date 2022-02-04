FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache --virtual .build-deps \
    ca-certificates gcc postgresql-dev linux-headers musl-dev \
    libffi-dev jpeg-dev zlib-dev

RUN apk add --no-cache --update \
    python3 python3-dev \
    gfortran g++ \
    libffi-dev openssl-dev \
    libxml2 libxml2-dev \
    libxslt libxslt-dev \
    libjpeg-turbo-dev

WORKDIR /app/backend_api
RUN pip install --upgrade cython
RUN pip install --upgrade pip && pip install virtualenv
# RUN pip install virtualenv
ADD . /app/backend_api
RUN virtualenv venv

RUN source venv/bin/activate
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . /app/backend_api/

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["gunicorn", "--bind", ":8000", "backend_api.wsgi:application"]