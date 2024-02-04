export type ExpensesItemType = {
  id: string,
  summ: string,
  target: string,
  date: string,
}

export const getExpensesList = async () => {
  try {
    const res = await fetch("https://finance-ac1dd-default-rtdb.europe-west1.firebasedatabase.app/expenses.json")
    if (res.status !== 200) throw new Error("fetch error")
    const data = await res.json()
    const correctData: ExpensesItemType[] = []
    for (const key in data) {
      correctData.push({
        id: key,
        ...data[key]
      })
    }
    return correctData.reverse()
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}
export const createExpensesItem = async (target: string, summ: string) => {
  try {
    const res = await fetch("https://finance-ac1dd-default-rtdb.europe-west1.firebasedatabase.app/expenses.json", {
      method: "POST",
      body: JSON.stringify({
        target,
        summ,
        date: new Date(),
      })
    })
    if (res.status !== 200) throw new Error("fetch error")
    return "Трата успешно добавлена"
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}
