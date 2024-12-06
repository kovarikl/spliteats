use crate::model::{AppState, GenericResponse};
use crate::model::{CreateOrderBody, Order, OrderStatus, PayOrderBody};
use actix_web::{get, patch, post, web, HttpResponse, Responder};
use uuid::Uuid;

#[post("/orders")]
async fn create_order_handler(
    body: web::Json<CreateOrderBody>,
    data: web::Data<AppState>,
) -> impl Responder {
    let mut orders = data.order_db.lock().unwrap();

    let order = Order {
        id: Uuid::new_v4().to_string(),
        items: body.items.to_owned(),
        total_price: body.total_price.to_owned(),
        status: OrderStatus::Pending,
    };

    orders.push(order.clone());
    HttpResponse::Ok().json(&order)
}

#[get("/orders/{id}")]
async fn get_order_handler(id: web::Path<String>, data: web::Data<AppState>) -> impl Responder {
    let orders = data.order_db.lock().unwrap();

    let order = orders.iter().find(|order| order.id == *id);

    if order.is_none() {
        return HttpResponse::NotFound().json(GenericResponse {
            status: "fail".to_string(),
            message: format!("Order with ID: {} not found", id),
        });
    }

    HttpResponse::Ok().json(order)
}

#[patch("/orders/{id}")]
async fn pay_order_handler(
    id: web::Path<String>,
    body: web::Json<PayOrderBody>,
    data: web::Data<AppState>,
) -> impl Responder {
    let mut orders = data.order_db.lock().unwrap();

    let order = orders.iter_mut().find(|order| order.id == *id);

    if order.is_none() {
        return HttpResponse::NotFound().json(GenericResponse {
            status: "fail".to_string(),
            message: format!("Order with ID: {} not found", id),
        });
    }

    let order = order.expect("Order should exist");
    for item in body.items.iter() {
        let order_item = order.items.iter_mut().find(|order_item| {
            order_item.meal_id == item.meal_id && order_item.restaurant_id == item.restaurant_id
        });

        if order_item.is_none() {
            return HttpResponse::NotFound().json(GenericResponse {
                status: "fail".to_string(),
                message: format!("Order item with meal ID: {} not found", item.meal_id),
            });
        }

        let order_item = order_item.expect("Order item should exist");
        order_item.quantity_paid += item.quantity_paid;

        if order_item.quantity_paid == order_item.quantity {
            order.status = OrderStatus::Completed;
        }
    }

    HttpResponse::Ok().json(order)
}

pub fn config(conf: &mut web::ServiceConfig) {
    let scope = web::scope("/api")
        .service(create_order_handler)
        .service(get_order_handler)
        .service(pay_order_handler);

    conf.service(scope);
}
