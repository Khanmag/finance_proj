import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIncomeList, IncomeItemType } from "../../api/income";
import { ExpensesItemType, getExpensesList } from "../../api/expenses";

type FinanceStateType = {
  balance: number,
  incomeStatus: "success" | "error" | "pending",
  expensesStatus: "success" | "error" | "pending",
  incomeData: IncomeItemType[],
  expensesData: ExpensesItemType[],
}

const initialState: FinanceStateType = {
  balance: 0,
  incomeStatus: "success",
  expensesStatus: "success",
  incomeData: [],
  expensesData: [],
}

export const fetchIncomes = createAsyncThunk(
  'finance/fetchIncomes',
  async (_, {rejectWithValue}) => {
    const data = await getIncomeList()
    if (!data) return rejectWithValue('error')
    return data
  }
)
export const fetchExpenses = createAsyncThunk(
  'finance/fetchExpenses',
  async (_, {rejectWithValue}) => {
    const data = await getExpensesList()
    if (!data) return rejectWithValue('error')
    return data
  }
)

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIncomes.pending, (state) => {
      state.incomeStatus = "pending"
    }) 
    builder.addCase(fetchIncomes.fulfilled, (state, action:PayloadAction<IncomeItemType[]>) => {
      state.incomeStatus = "success"
      state.incomeData = action.payload
      state.balance = state.incomeData.reduce((acc, i) => acc + +i.summ, 0) - state.expensesData.reduce((acc, i) => acc + +i.summ, 0)
    }) 
    builder.addCase(fetchIncomes.rejected, (state) => {
      state.incomeStatus = "error"
    }) 
    //
    builder.addCase(fetchExpenses.pending, (state) => {
      state.expensesStatus = "pending"
    }) 
    builder.addCase(fetchExpenses.fulfilled, (state, action:PayloadAction<ExpensesItemType[]>) => {
      state.expensesStatus = "success"
      state.expensesData = action.payload
      state.balance = state.incomeData.reduce((acc, i) => acc + +i.summ, 0) - state.expensesData.reduce((acc, i) => acc + +i.summ, 0)
    })
    builder.addCase(fetchExpenses.rejected, (state) => {
      state.expensesStatus = "error"
    }) 
  }
})


export const { setBalance } = financeSlice.actions

export default financeSlice.reducer


