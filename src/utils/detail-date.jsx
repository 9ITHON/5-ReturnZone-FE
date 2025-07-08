// utils/date.js

export const DetailDate = (startISO, endISO) => {
  const start = new Date(startISO);
  const end = new Date(endISO);

  const dateStr = start.toLocaleDateString('ko-KR', {
    month: 'long', // "7월"
    day: 'numeric', // "7일"
  });

  const startTime = start.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const endTime = end.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${dateStr} | ${startTime} ~ ${endTime}`;
};
