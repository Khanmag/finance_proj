import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createExpensesItem } from "../../api/expenses";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchExpenses } from "../../store/finance/financeSlice";

const ExpensesPage = () => {
  const [target, setTarget] = useState("")
  const [summ, setSumm] = useState("")
  const expensesList = useAppSelector(s => s.finance.expensesData)
  const dispatch = useAppDispatch()

  const createExpenses = () => {
    if (!summ.trim() || !target.trim()) return null;
    createExpensesItem(target, summ).then(() => dispatch(fetchExpenses()))
    setTarget("")
    setSumm("")
  }
  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  return (
    <div>
      <Box p
        ={2} display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={"10px"}>

        <TextField
          label="Цель расхода"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <TextField
          label="Сумма"
          type="number"
          value={summ}
          onChange={(e) => setSumm(e.target.value)}
        />

        <Button
          variant="outlined"
          color="error"
          onClick={createExpenses}
        >
          создать
        </Button>
      </Box>

      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Цель расхода</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesList.map(item => (
              <TableRow key={item.id} style={(Date.now() - Date.parse(item.date) < 24 * 3600 * 1000) ? { backgroundColor: 'rgba(205,74,76, 0.2)' } : {}}>
                <TableCell>{(item.date) ? (new Date(item.date)).toLocaleDateString() : ""}</TableCell>
                <TableCell>{item.summ}</TableCell>
                <TableCell>{item.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default ExpensesPage;

