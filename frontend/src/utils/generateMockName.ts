interface MockName {
  name: string;
  surname: string;
}

const generateMockName = (): MockName => {
  const names = [
    "John",
    "Emily",
    "Michael",
    "Sophia",
    "James",
    "Olivia",
    "David",
    "Emma",
    "Daniel",
    "Isabella",
  ];

  const surnames = [
    "Smith",
    "Johnson",
    "Brown",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
  ];

  const randomElement = (array: string[]) =>
    array[Math.floor(Math.random() * array.length)];

  const generated = {
    name: randomElement(names),
    surname: randomElement(surnames),
  };

  sessionStorage.setItem("name", JSON.stringify(generated));
  return generated;
};

export { generateMockName, type MockName };
