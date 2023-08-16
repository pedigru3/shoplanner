export function parseBRLCurrent(currencyString: string): number | undefined {
 // Remove non-numeric characters except for comma and period
 const cleanedInput = currencyString.replace(/[^\d,.]/g, '');

 // Replace comma with period and remove thousands separators
 const numericString = cleanedInput.replace(/[,.]/g, match => (match === ',' ? '.' : ''));

 // Parse the string to a number
 const parsedValue = parseFloat(numericString);

 // Ensure the parsed value is a valid number
 if (!isNaN(parsedValue)) {
   return parsedValue;
 } else {
   return undefined; // Return null for invalid inputs
 }
}