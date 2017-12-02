# Before building this dockerfile, you need to be on a machine
# that has: docker, ssh
# In the root of your project directory, generate a public ssh key
# with the following command:
# ssh-keygen -q -t rsa -N '' -f repo-key
# Then upload that repo-key.pub into the bitbucket repository

FROM fedora:latest

RUN dnf upgrade -y && dnf clean all
RUN dnf install -y git nodejs npm

WORKDIR /app
ADD . /app


ADD repo-key /
RUN chmod 600 /repo-key
RUN echo "IdentityFile /repo-key" >> /etc/ssh/ssh_config
RUN echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config
RUN git clone https://github.com/sjmoon0/spoons.git

WORKDIR webapp
RUN npm install

COPY . /app/webapp/

EXPOSE 3000
CMD ["node", "app.js"]
