export const getPerbandingan = (width: number, height: number): number[] => {
  let setWidth = Math.floor(width)
  let setHeight = Math.floor(height)
  function findFPB(angka1: number, angka2: number) {
    if (angka2 === 0) return angka1;
    return findFPB(angka2, angka1 % angka2);
  }
  const fpb = findFPB(setWidth, setHeight);
  const perbandingan1 = setWidth / fpb;
  const perbandingan2 = setHeight / fpb;
  return [perbandingan1 * setHeight, perbandingan2 * setWidth]
}