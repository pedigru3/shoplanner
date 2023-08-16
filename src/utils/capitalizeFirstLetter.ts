export function capitalizeFirstLetter(inputString: string): string {
  if (inputString.length === 0) {
    return ""; // Retorna uma string vazia se a entrada for vazia
  }
  
  const firstLetter = inputString[0].toUpperCase();
  const restOfString = inputString.slice(1).toLowerCase();
  
  return firstLetter + restOfString;
}