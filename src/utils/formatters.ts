/**
 * Formats a number as a currency string (ZAR - South African Rand)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  }).format(value);
}

/**
 * Formats a date string to a localized date format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formats a full name from first and last name components
 */
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

/**
 * Formats a date range as a string
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // If dates are in the same year, only show year once
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  }
  
  return `${start.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })} - ${end.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

/**
 * Formats a number as a percentage
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}
