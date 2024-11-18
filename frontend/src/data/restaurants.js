import raw_restaurants from "./restaurants.json";

// The probability of getting and error when loading any data.
export const ERROR_RATE = 0.2;
// The time it takes (on average) to load one item (simulating data processing and network activity).
export const LOAD_TIME = 1000;

// Assign IDs to restaurants and perform basic integrity checking,
// in case the random data is not correct.
let i = 0;
let restaurant_ids = [];
let restaurant_data = {};
for (let r of raw_restaurants) {
  i += 1;

  const id = `id_${i}`;
  r["id"] = id;
  restaurant_ids.push(id);
  restaurant_data[id] = r;

  if (!("categories" in r)) {
    throw new Error("Categories missing.");
  }
  if (!("name" in r)) {
    throw new Error("Name missing.");
  }
  if (!("address" in r)) {
    throw new Error("Address missing.");
  }
  if (!("ratingAverage" in r)) {
    throw new Error("Rating average missing.");
  }
  if (!("ratingCount" in r)) {
    throw new Error("Rating count missing.");
  }
  if (!("priceCategory" in r)) {
    throw new Error("Price category missing.");
  }
  if (!("openingHours" in r)) {
    throw new Error("Opening hours missing.");
  }
  if (!("mealTypes" in r)) {
    throw new Error("Meal types missing.");
  }
  if (!("meals" in r)) {
    throw new Error("Meals missing.");
  }
  for (let key in r["openingHours"]) {
    if (r["openingHours"][key].length % 2 != 0) {
      throw new Error("Wrong number of opening hours intervals.");
    }
  }
  for (let meal of r["meals"]) {
    if (!("name" in meal)) {
      throw new Error("Meal name missing.");
    }
    if (!("description" in meal)) {
      throw new Error("Meal description missing.");
    }
    if (!("price" in meal)) {
      throw new Error("Meal price missing.");
    }
    if (!("type" in meal)) {
      throw new Error("Meal type missing.");
    }
    if (!r["mealTypes"].includes(meal["type"])) {
      throw new Error("Unknown meal type.");
    }
  }
}

/**
 * Retrieve a fresh copy of restaurant metadata (i.e. restaurant without meals).
 */
function onlyMetadata(id) {
  let data = structuredClone(restaurant_data[id]);
  delete data["mealTypes"];
  delete data["meals"];
  return data;
}

/**
 * Apply a random delay and error rate; if successful, run `resolve(value)`,
 * otherwise run `reject(Error)`.
 */
function makeFuzzy(value, resolve, reject) {
  const duration = Math.random() * LOAD_TIME;
  if (Math.random() > ERROR_RATE) {
    setTimeout(() => resolve(value), duration);
  } else {
    setTimeout(() => reject(new Error("Communication error.")), duration);
  }
}

export const restaurants = {
  getAllIds: function () {
    return new Promise((resolve, reject) => {
      makeFuzzy(structuredClone(restaurant_ids), resolve, reject);
    });
  },
  getAllMetadata: function () {
    return new Promise((resolve, reject) => {
      let metaData = [];
      for (let id in restaurant_data) {
        metaData.push(onlyMetadata(id));
      }
      makeFuzzy(metaData, resolve, reject);
    });
  },
  getRestaurantMetadata: function (id) {
    return new Promise((resolve, reject) => {
      if (!(id in restaurant_data)) {
        makeFuzzy(new Error("Unknown restaurant"), reject, reject);
      } else {
        makeFuzzy(onlyMetadata(restaurant_data[id]), resolve, reject);
      }
    });
  },
  getRestaurant: function (id) {
    return new Promise((resolve, reject) => {
      if (!(id in restaurant_data)) {
        makeFuzzy(new Error("Unknown restaurant"), reject, reject);
      } else {
        makeFuzzy(structuredClone(restaurant_data[id]), resolve, reject);
      }
    });
  },
};
