export function calculatePriority(subject: string, description: string): 'High' | 'Medium' | 'Low' {
  const combinedText = `${subject} ${description}`.toLowerCase()

  // High priority keywords
  const highPriorityKeywords = ['payment failed', 'server down', 'cannot login', 'urgent', 'critical']
  if (highPriorityKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'High'
  }

  // Medium priority keywords
  const mediumPriorityKeywords = ['slow', 'bug', 'issue', 'error', 'broken']
  if (mediumPriorityKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'Medium'
  }

  // Default to Low
  return 'Low'
}
