export const calculateSnoozeDaysLeft = (snoozeUntil: Date) => {
  const snoozeDate = new Date(snoozeUntil)
  const currentDate = new Date()
  const differenceInTime = snoozeDate.getTime() - currentDate.getTime()

  // Calculate the difference in days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

  // Return the number of days left, or 0 if the date has passed
  return differenceInDays > 0 ? differenceInDays : 0
}
