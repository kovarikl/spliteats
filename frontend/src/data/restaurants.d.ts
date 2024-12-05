export const ERROR_RATE: number;
export const LOAD_TIME: number;

// Used as a key in the "dictionary" that describes opening hours.
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

// Assigns opening hours to week days. If a day is missing, it means the restaurant
// is closed that day. The items are always lists of strings. Each such string should be
// in the HH:mm format. These values are sorted in increasing order, such that even items
// are opening hours, and odd items are closing hours.
//
// For example ["9:00", "11:00", "13:00", "15:00"] means the restaurant
// is open 9-11 and then 13-15.
export type OpeningHours = Record<DayOfWeek, [string]>;

export interface Meal {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  // Amount in CZK
  price: number;
  // Should reference one of the meal types declared by the corresponding Restaurant.
  type: string;
}

export interface RestaurantMetadata {
  // A unique, "random" identifier.
  id: string;
  // One or more categories this restaurant belongs in (usually based on the type of cuisine
  // or type of meals).
  categories: [string];
  name: string;
  // An address string. Should have at least street, house number, and city.
  // Sometimes also contains ZIP code or other info.
  address: string;
  // Average rating, float on the scale of 1-10.
  ratingAverage: number;
  // The number of ratings collected so far (integer).
  ratingCount: number;
  // Price rating, int on the scale of 1-5.
  priceCategory: number;
  openingHours: OpeningHours;
}

export interface Restaurant extends RestaurantMetadata {
  // Categories of meals served by this restaurant.
  mealTypes: [string];
  // List of meals served by this restaurant.
  meals: [Meal];
}

// The API provides a separate method form "just metadata" in case
// you want to only quickly look at restaurant info without retrieving all meals.
export interface RestaurantApi {
  // Retrieve the list of all restaurant IDs.
  getAllIds(): Promise<[string]>;
  // Retrueve metadata for all restaurants.
  getAllMetadata(): Promise<[RestaurantMetadata]>;
  // Retrieve metdata for one restaurant.
  getRestaurantMetadata(id: string): Promise<RestaurantMetadata>;
  // Retrieve all data (metadata + meals) for one restaurant.
  getRestaurant(id: string): Promise<Restaurant>;
}

export const restaurants: RestaurantApi;
