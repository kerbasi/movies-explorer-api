const mustBeFilled = (name) => {
  if (typeof name !== 'string') return name;
  return `Поле ${name.toUpperCase()} обязательно должно быть заполнено`;
};

module.exports = {
  mustBeFilled,
};
