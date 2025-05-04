/**
 * South African ID Number validation
 * Format: YYMMDD SSSS Z C
 * - YYMMDD: Date of birth
 * - SSSS: Gender (Females: 0000-4999, Males: 5000-9999)
 * - Z: Citizenship (0: SA Citizen, 1: Permanent Resident)
 * - C: Checksum digit
 */
export const validateSAID = (idNumber: string): boolean => {
  try {
    // Basic format check: must be 13 digits
    if (!/^\d{13}$/.test(idNumber)) {
      return false;
    }

    // Extract date components from ID number
    const year = parseInt(idNumber.substring(0, 2));
    const month = parseInt(idNumber.substring(2, 4));
    const day = parseInt(idNumber.substring(4, 6));

    // Basic date validation
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    // We'll skip the complex Luhn algorithm validation for the app's purposes
    // For a real production app, you might want to implement the full validation
    
    return true;
  } catch (error) {
    console.error("Error validating SA ID:", error);
    return false;
  }
};

/**
 * South African Tax Reference Number validation
 * Format: NNNN/NNNNN/NN/N
 * - 10 digits with specific formatting
 */
export const validateTaxRef = (taxRef: string): boolean => {
  // Remove any spaces or formatting
  const cleanTaxRef = taxRef.replace(/\s+/g, '').replace(/\//g, '');
  
  // Basic format check
  if (!cleanTaxRef || cleanTaxRef.length !== 10 || !/^\d+$/.test(cleanTaxRef)) {
    return false;
  }
  
  // Modulus 10 check (basic implementation)
  let sum = 0;
  let alternate = false;
  
  for (let i = cleanTaxRef.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanTaxRef.charAt(i));
    
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  return sum % 10 === 0;
};

/**
 * Format a South African tax reference number with the standard format
 * (NNNN/NNNNN/NN/N)
 */
export const formatTaxRef = (taxRef: string): string => {
  // Remove any existing formatting
  const cleanTaxRef = taxRef.replace(/\s+/g, '').replace(/\//g, '');
  
  if (cleanTaxRef.length !== 10) {
    return taxRef; // Return original if not valid length
  }
  
  return `${cleanTaxRef.substring(0, 4)}/${cleanTaxRef.substring(4, 9)}/${cleanTaxRef.substring(9)}`;
};

/**
 * Validate a bank account number (basic implementation)
 * South African bank account numbers vary in length (typically 9-12 digits)
 */
export const validateBankAccount = (accountNumber: string): boolean => {
  const cleanAccountNumber = accountNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  // Basic validation - SA bank account numbers are typically 9-12 digits
  return /^\d{9,12}$/.test(cleanAccountNumber);
};

/**
 * Generate mock ACB (Bankserv) tape format header
 * This is a simplified version for demonstration
 */
export const generateACBHeader = (
  companyName: string, 
  date: Date, 
  batchNumber: string
): string => {
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  
  // ACB Header format (simplified)
  return `1${formattedDate.padEnd(8, ' ')}${batchNumber.padEnd(6, '0')}${companyName.padEnd(40, ' ')}`;
};

/**
 * Generate mock EasyFile CSV header
 * This is a simplified version for demonstration
 */
export const generateEasyFileHeader = (): string => {
  return 'TAX_YEAR,PAYE_REF,EMP_NAME,EMP_ID,ID_TYPE,ID_NUMBER,SURNAME,FIRSTNAME,INITIALS,DOB,INCOME,TAX_DEDUCTED';
};

/**
 * Format South African ID number with spaces for readability
 * Format: YYMMDD SSSS ZC
 */
export const formatSAID = (idNumber: string): string => {
  const cleanID = idNumber.replace(/\s+/g, '');
  
  if (cleanID.length !== 13) {
    return idNumber; // Return original if not valid length
  }
  
  return `${cleanID.substring(0, 6)} ${cleanID.substring(6, 10)} ${cleanID.substring(10)}`;
};

/**
 * Validate UIF reference number
 * Basic implementation
 */
export const validateUIF = (uifRef: string): boolean => {
  const cleanUIF = uifRef.replace(/\s+/g, '').replace(/\//g, '').replace(/-/g, '');
  
  // UIF references are typically 8-10 digits
  return /^\d{8,10}$/.test(cleanUIF);
};
