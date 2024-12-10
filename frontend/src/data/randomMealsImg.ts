const imgs = [
  "https://media.glamourmagazine.co.uk/photos/650c5b43ecbada2fa25bdad2/3:2/w_1920,h_1280,c_limit/MEAL%20PREP%20210923%20default.jpg",
  "https://takethemameal.com/files_images_v2/stam.jpg",
  "https://purfoodstorage.blob.core.windows.net/resources/recipeImages/Cinnamon_apple_oatmeal_Scrambled_eggs_plate_220214_0029.jpg",
];

const randomMealsImg = (id: string) => {
  const splitId = id.split("_");
  const index = parseInt(splitId[splitId.length - 1]);
  return imgs[index % imgs.length];
};

export { randomMealsImg };
