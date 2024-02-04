import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import IncomePage from "./pages/Income"
import ExpensesPage from "./pages/Expenses"
import BalancePage from "./pages/Balance"


function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BalancePage />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="*" element={<h1>not found</h1>} />
        </Route>
      </Routes>
  )
}

export default App
