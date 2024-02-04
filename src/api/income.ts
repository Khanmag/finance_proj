
export type IncomeItemType = {
  id: string,
  summ: string,
  source: string,
  date: string,
}

export const getIncomeList = async () => {
  try {
    const res = await fetch("https://finance-ac1dd-default-rtdb.europe-west1.firebasedatabase.app/income.json")
    if (res.status !== 200) throw new Error("fetch error")
    const data = await res.json()
    const correctData: IncomeItemType[] = []
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

export const createIncomeItem = async (source: string, summ: string) => {
  try {
    const res = await fetch("https://finance-ac1dd-default-rtdb.europe-west1.firebasedatabase.app/income.json", {
      method: "POST",
      body: JSON.stringify({
        source,
        summ,
        date: new Date(),
      })
    })
    if (res.status !== 200) throw new Error("fetch error")
    return "Прибыль успешно добавлена"
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}
