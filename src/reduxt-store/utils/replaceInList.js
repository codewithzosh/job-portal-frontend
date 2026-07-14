export function replaceInList(list, updatedItem) {
  const index = list.findIndex((item) => item.id === updatedItem.id);

  if (index !== -1) {
    list[index] = updatedItem;
  }

  return list
}