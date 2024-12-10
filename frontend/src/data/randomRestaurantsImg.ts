const imgs = [
  "https://commonmarketrestaurants.com/wp-content/uploads/2024/03/BALLAST-13.jpg",
  "https://www.dellaadventure.com/images/cafe-24-thumb3.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/3b/ac/a6/light-filled-and-open.jpg?w=600&h=-1&s=1",
];

const randomRestaurantsImg = (id: string) => {
  const splitId = id.split("_");
  const index = parseInt(splitId[splitId.length - 1]);
  return imgs[index % imgs.length];
};

export { randomRestaurantsImg };
