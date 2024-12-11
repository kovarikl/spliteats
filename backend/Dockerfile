FROM rust:alpine3.20 as builder

WORKDIR /usr/src/backend

COPY ./Cargo.toml ./Cargo.toml
COPY ./Cargo.lock ./Cargo.lock
COPY ./src ./src

RUN apk add --no-cache musl-dev
RUN cargo build --release

FROM gcr.io/distroless/base-debian12 as runtime

WORKDIR /usr/bin

COPY --from=builder /usr/src/backend/target/release/backend /usr/bin/backend

CMD ["backend"]