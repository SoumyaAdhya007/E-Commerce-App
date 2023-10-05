// Function to capitalize the first letter of a word
export const capitalizeFirstLetter = (str) => {
  const words = str.split(" ");

  // Use map to capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" "); // Join the words back into a single string
};
