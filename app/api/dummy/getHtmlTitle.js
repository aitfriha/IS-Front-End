export default function (location) {
  return ' - ' + location.pathname.split('/')
    .pop()
    .replace(/-/g, ' ')
    .replace(/(^|\s)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
}
