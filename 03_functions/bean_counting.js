function countChar (string, character) {
  count = 0
  for (let i = 0; i < string.length; i++)
    if (string[i] == character)
      count += 1

  return count
}