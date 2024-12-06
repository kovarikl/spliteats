use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

pub struct AppState {
    pub order_db: Arc<Mutex<Vec<Order>>>,
}

impl AppState {
    pub fn init() -> AppState {
        AppState {
            order_db: Arc::new(Mutex::new(Vec::new())),
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct OrderItem {
    pub(crate) restaurant_id: String,
    pub(crate) meal_id: String,
    pub(crate) quantity: i32,
    pub(crate) unit_price: i32,
    pub(crate) quantity_paid: i32,
}

#[derive(Serialize, Clone)]
pub enum OrderStatus {
    Pending,
    Completed,
}

#[derive(Serialize, Clone)]
pub struct Order {
    pub(crate) id: String,
    pub(crate) items: Vec<OrderItem>,
    pub(crate) total_price: i32,
    pub(crate) status: OrderStatus,
}

#[derive(Deserialize)]
pub struct CreateOrderBody {
    pub(crate) items: Vec<OrderItem>,
    pub(crate) total_price: i32,
}

#[derive(Deserialize)]
pub struct PayOrderItem {
    pub(crate) restaurant_id: String,
    pub(crate) meal_id: String,
    pub(crate) quantity_paid: i32,
}

#[derive(Deserialize)]
pub struct PayOrderBody {
    pub(crate) items: Vec<PayOrderItem>,
}

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}
