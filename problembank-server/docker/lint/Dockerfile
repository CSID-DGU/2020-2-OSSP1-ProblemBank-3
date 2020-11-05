FROM python:3

RUN pip3 install cpplint
COPY ./run.sh /
RUN chmod 744 run.sh
CMD /run.sh