FROM node:bookworm

RUN apt update

RUN apt install -y \
    git \
    curl

# Enable PNPM.
RUN corepack enable pnpm

# Set shell.
ENV SHELL=/bin/bash

# Install Scarb.
RUN curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
