export const formatPrice = (price: number | undefined) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return ""; // Return empty string if price is undefined
  };