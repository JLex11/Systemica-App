export const filterItems = (items, query) => {
  if (!query) return items;
  if (typeof query !== typeof '') return items;
  
  if (query.match(/[a-z]+:{1}/i)) {
    const [fieldStr, stringValue] = query.split(':');

    const ObjectKey = Object.keys(items[0]).find(key => 
      key.match(new RegExp(fieldStr, 'i'))
    );

    if (!ObjectKey) {
      return items.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(stringValue.toString().toLowerCase())
        )
      );
    }

    return items.filter(item => {
      return item[ObjectKey].toString().toLowerCase().includes(stringValue.toString().toLowerCase());
    });
  }

  return items.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
};