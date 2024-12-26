function isEven (num) {
  if (num == 0)
    return true;
  else if (Math.abs(num) == 1)
    return false;
  else
    return isEven(Math.abs(num) - 2);
}