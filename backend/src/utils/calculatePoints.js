export default function (timeRemaining) {
  return Math.ceil((1000 * (timeRemaining / 60)) / 10) * 10
}
