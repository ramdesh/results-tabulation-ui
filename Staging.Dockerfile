FROM tiangolo/node-frontend:10 as builder

ADD ./src /app/src
COPY package*.json /app/
COPY ./public /app/public
WORKDIR /app
RUN npm install
ENV REACT_APP_BASE_PATH="tabulation"
ENV REACT_APP_HOME_PATH="/home"
ENV REACT_APP_LOGIN_PATH="/login"
ENV REACT_APP_LOGOUT_PATH="/logout"
ENV REACT_APP_IS_ENDPOINT="https://is.ecstag.opensource.lk"
ENV REACT_APP_TABULATION_API_ENDPOINT="https://api.tabulation.ecstag.opensource.lk"
ENV REACT_APP_CLIENT_ID="vNAlVemkxkxLJdhgfYsYyiRmN3Ma"
ENV REACT_APP_CLIENT_HOST="http://tabulations.ecstag.opensource.lk"
ENV REACT_APP_LOGIN_CALLBACK_URL="http://tabulations.ecstag.opensource.lk/tabulation/login"
ENV REACT_APP_LOGOUT_CALLBACK_URL="http://tabulations.ecstag.opensource.lk/tabulation/logout"
RUN npm run build

FROM nginx:1.15

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"];
# CMD echo 'window._env_ = {}; window._env_.API_BASE ="'${API_BASE}'"' > env-config.js && nginx -g 'daemon off;'
# CMD ["bash", "-c", "echo 'window._env_.API_BASE = \"$API_BASE\"' > env-config.js && nginx -g 'daemon off;'"]
# CMD echo ${API_BASE}