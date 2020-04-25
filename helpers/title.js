export default function title(str) {
  const regex = /(?:(?:(\s?(?:^|[.\(\)!?;:"-])\s*)(\w))|(\w))(\w*[’']*\w*)/g
  const specials = ['http', 'https', 'cli', 'api']

  return str
    .toLowerCase()
    .replace(regex, (m, lead = '', forced, lower, rest) => {
      if (specials.includes(m)) return m.toUpperCase()

      return lead + (lower || forced).toUpperCase() + rest
    })
}
