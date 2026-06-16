export const FAQ: { keywords: string[]; response: string }[] = [
  {
    keywords: ['password', 'reset', 'forgot'],
    response: 'Try resetting your password from the login page. Click "Forgot password?" and follow the instructions sent to your email.',
  },
  {
    keywords: ['payment', 'transaction', 'billing'],
    response: 'Please verify your transaction details and check your payment method. If the issue persists, contact our billing team.',
  },
  {
    keywords: ['login', 'cannot', 'unable', 'locked'],
    response: 'If you cannot log in, try resetting your password or clearing your browser cache. Contact support if the issue continues.',
  },
  {
    keywords: ['slow', 'performance', 'lag'],
    response: 'For slow performance issues, try clearing your cache, updating your browser, or checking your internet connection.',
  },
  {
    keywords: ['bug', 'error', 'issue'],
    response: 'Please provide details about the bug or error you encountered. This helps us fix it faster.',
  },
  {
    keywords: ['account', 'profile', 'create', 'register'],
    response: 'To create an account, go to the Register page and fill in your details. You will receive a confirmation email.',
  },
  {
    keywords: ['ticket', 'status', 'update'],
    response: 'You can view your ticket status in your Dashboard. Updates are sent via email when your ticket status changes.',
  },
  {
    keywords: ['urgent', 'critical', 'server', 'down'],
    response: 'This is marked as high priority. Our team is working on it. You will receive updates via email.',
  },
]

export function findFAQResponse(userMessage: string): string | null {
  const lowerMessage = userMessage.toLowerCase()

  for (const faq of FAQ) {
    if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return faq.response
    }
  }

  return null
}
