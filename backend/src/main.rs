mod handler;
mod model;

use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use model::AppState;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let order_db = AppState::init();
    let app_data = web::Data::new(order_db);

    println!("Server listening on 0.0.0.0:8000");

    HttpServer::new(move || {
        let cors = Cors::permissive();
        App::new()
            .app_data(app_data.clone())
            .configure(handler::config)
            .wrap(cors)
            .wrap(Logger::default())
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
