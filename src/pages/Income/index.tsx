import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createIncomeItem } from "../../api/income";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchIncomes } from "../../store/finance/financeSlice";

const IncomePage = () => {
  const [source, setSourse] = useState("")
  const [summ, setSumm] = useState("")
  // const [incomeList, setIncomeList] = useState<IncomeItemType[]>([])
  const incomeList = useAppSelector( s => s.finance.incomeData)
  const dispatch = useAppDispatch()
  const [itemCount, setItemCount] = useState(20)

  const createIncome = () => {
    if (!summ.trim() || !source.trim()) return null;
    createIncomeItem(source, summ).then(() => {dispatch(fetchIncomes())})
    setSourse("")
    setSumm("")
  }

  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        setItemCount(p => p + 10)
        // window.scrollBy(0, -200)
      }
    }
  })

  useEffect(() => {
    dispatch(fetchIncomes())
  }, [dispatch])

  return (
    <div>
      <Box p
        ={2} display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={"10px"}>

        <TextField
          label="Источник"
          value={source}
          onChange={(e) => setSourse(e.target.value)}
        />
        <TextField
          label="Сумма"
          type="number"
          value={summ}
          onChange={(e) => setSumm(e.target.value)}
        />

        <Button
          variant="outlined"
          color="success"
          onClick={createIncome}
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
              <TableCell>Источник</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeList.slice(0, itemCount).map(item => (
              <TableRow key={item.id} style={(Date.now() - Date.parse(item.date) < 24 * 3600 * 1000) ? { backgroundColor: '#BDECB6' } : {}}>
                <TableCell>{(item.date) ? (new Date(item.date)).toLocaleDateString() : ""}</TableCell>
                <TableCell>{item.summ}</TableCell>
                <TableCell>{item.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography ref={ref}>на данный момент это все доходы</Typography>
      </Box>
    </div>
  );
};

export default IncomePage;

