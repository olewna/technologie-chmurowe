ARG PYTHON_VERION="latest"

FROM python:${PYTHON_VERION}

COPY . .

RUN pip install -r ./myapp/requirements.txt

CMD ["python", "myapp/app.py"]