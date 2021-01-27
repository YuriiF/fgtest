export function calculateMA(dayCount: number, data: string | any[]) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }

    let sum = 0;

    for (let j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }

    result.push((sum / dayCount).toFixed(2));
  }
  return result;
}
