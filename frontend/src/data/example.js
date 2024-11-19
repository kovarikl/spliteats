import { restaurants } from "./restaurants.js";

// Note that `getAllMetadata` and `getAllIds` can also fail, we
// are just not checking for that situation in this example.

for (const data of await restaurants.getAllMetadata()) {
  console.log(data["name"]);
}

for (const id of await restaurants.getAllIds()) {
  try {
    console.log(await restaurants.getRestaurant(id));
  } catch (e) {
    console.log(e);
  }
}
