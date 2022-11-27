export const filterItems = (items, query) => {
  const result = {
    filteredItems: items,
    ObjectKey: null,
    inKey: query
  }

  if (!query) return result
  if (typeof query !== typeof '') return result
  
  if (query.match(/[a-z]+:{1}/i)) {
    const [fieldStr, stringValue] = query.split(':')

    const ObjectKey = Object.keys(items[0]).find(key => 
      key.match(new RegExp(fieldStr, 'i'))
    )

    if (!ObjectKey) {
      result.filteredItems = items.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(stringValue.toString().toLowerCase())
        )
      )
      return result
    }

    result.ObjectKey = ObjectKey
    result.inKey = fieldStr
    result.filteredItems = items.filter(item => {
      return item[ObjectKey].toString().toLowerCase().includes(stringValue.toString().toLowerCase())
    })
    return result
  }

  result.filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  )
  return result
}