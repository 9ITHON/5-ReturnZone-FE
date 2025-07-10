/**
 * 가격을 1000단위로 포맷팅하는 함수
 * @param {number|string} price - 포맷팅할 가격
 * @returns {string} 포맷팅된 가격 문자열 (예: "10,000원")
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return '0원';
  
  // 숫자로 변환
  const numPrice = typeof price === 'string' ? parseInt(price, 10) : price;
  
  // NaN 체크
  if (isNaN(numPrice)) return '0원';
  
  // 1000단위로 포맷팅
  return `${numPrice.toLocaleString()}원`;
};

/**
 * 가격을 1000단위로 포맷팅하되 "원" 없이 반환하는 함수
 * @param {number|string} price - 포맷팅할 가격
 * @returns {string} 포맷팅된 가격 문자열 (예: "10,000")
 */
export const formatPriceWithoutWon = (price) => {
  if (!price && price !== 0) return '0';
  
  // 숫자로 변환
  const numPrice = typeof price === 'string' ? parseInt(price, 10) : price;
  
  // NaN 체크
  if (isNaN(numPrice)) return '0';
  
  // 1000단위로 포맷팅
  return numPrice.toLocaleString();
}; 