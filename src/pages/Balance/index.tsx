import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getExpensesList } from "../../api/expenses";
import { getIncomeList } from "../../api/income";

const BalancePage = () => {
  const [expensesSummary, setExpensesSummary] = useState<number>(0)
  const [incomeSummary, setIncomeSummary] = useState<number>(0)

  const getExpenses = async () => {
    const data = await getExpensesList()
    if (data) setExpensesSummary(data.reduce((acc, item) => acc + +item.summ, 0))
  }
  const getIncome = async () => {
    const data = await getIncomeList()
    if (data) setIncomeSummary(data.reduce((acc, item) => acc + +item.summ, 0))
  }
  useEffect(() => {
    getExpenses()
    getIncome()
  })
  return (
    <Box>
      <Box display={"flex"} p={2} gap={2} justifyContent={"space-around"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography variant="h5">Доходы за всё время</Typography>
          <Chip label={incomeSummary} color="success" variant="outlined" />
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography variant="h5">Расходы за всё время</Typography>
          <Chip label={expensesSummary} color="error" variant="outlined" />
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography>Итог</Typography>
        {(incomeSummary > expensesSummary) ? (
          <Chip label={"+" + (incomeSummary - expensesSummary)} color="success" variant="outlined" />
        ) : (
          <Chip label={"-" + (expensesSummary - incomeSummary)} color="error" variant="outlined" />
        )}
      </Box>
    </Box>
  );
};

export default BalancePage;
