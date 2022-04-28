FROM locustio/locust

# we don't have dependencies, but if we had, this would be needed
# COPY requirements.txt ./

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
