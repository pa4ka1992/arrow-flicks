export const getBudget = (money: number) => {
  if (!money) {
    return undefined;
  }

  return `$${money.toLocaleString('en-US')}`;
};
