// This would normally be queried from the database
// For now, we use hardcoded admin IDs based on category
export const ADMIN_ASSIGNMENTS = {
  'Payment': 1,        // Admin1 - Payment
  'Billing': 1,        // Admin1 - Billing
  'Technical': 2,      // Admin2 - Technical
  'Server': 2,         // Admin2 - Server
  'Login': 2,          // Admin2 - Login
  'General': 3,        // Admin3 - General
}

export function getAssignedAdminId(category: string): number | null {
  const adminId = ADMIN_ASSIGNMENTS[category as keyof typeof ADMIN_ASSIGNMENTS]
  return adminId || null
}
