
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { Chip } from '@mui/material';
import { useEffect } from 'react';
import { fetchExpenses, fetchIncomes } from '../../store/finance/financeSlice';


const Header = () => {
  const balance = useAppSelector(store => store.finance.balance)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchIncomes())
    dispatch(fetchExpenses())
  }, [dispatch])
  
  return (
    <header>
      <NavLink to="/">Баланс - <Chip label={balance} variant='outlined' color={(balance > 0) ? "success" : "error"} /></NavLink>
      <NavLink to="/income">Доходы</NavLink>
      <NavLink to="/expenses">Расходы</NavLink>
    </header>
  );
};

export default Header;
