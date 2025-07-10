export const formatNumber = (number) => {
    if (typeof number !== "number") return number;
    return number.toLocaleString();
};