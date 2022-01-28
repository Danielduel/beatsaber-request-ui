FROM gitpod/workspace-full:latest

RUN bash -c 'VERSION="14.18.2" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

RUN printf '%s\n' "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix