// import { useEffect, useState } from "react";
// import { expenseApi } from "../services/expenseApi";
// import DateRangeTabs from "../components/DateRangeTabs";
// import AddExpenseForm from "../components/AddExpenseForm";
// import ExpenseTable from "../components/ExpenseTable";
// import { rangeFromDays } from "../utils/dateRanges";

// export default function Dashboard() {
//   const [range, setRange] = useState(rangeFromDays(7));
//   const [label, setLabel] = useState("1 Week");
//   const [expenses, setExpenses] = useState([]);
//   const [total, setTotal] = useState(0);

//   const load = async (r = range) => {
//     const [e, t] = await Promise.all([
//       expenseApi.getExpenses(r.start, r.end),
//       expenseApi.getTotal(r.start, r.end),
//     ]);
//     setExpenses(e.data);
//     setTotal(t.data.total);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const onRangeChange = (lbl, r) => {
//     setLabel(lbl);
//     setRange(r);
//     load(r);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-xl font-bold mb-4">💰 Money Tracker</h1>

//       <AddExpenseForm
//         onSave={async (payload) => {
//           await expenseApi.addExpenses(payload);
//           load();
//         }}
//       />

//       <DateRangeTabs active={label} onChange={onRangeChange} />

//       <div className="grid grid-cols-3 gap-4">
//         <div className="col-span-2">
//           <ExpenseTable
//             data={expenses}
//             onEdit={() => alert("Inline edit next 😉")}
//             onDelete={async (id) => {
//               if (confirm("Delete this expense?")) {
//                 await expenseApi.deleteExpense(id);
//                 load();
//               }
//             }}
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <h3 className="text-sm text-gray-500">Total ({label})</h3>
//           <p className="text-2xl font-bold mt-2">₹ {total}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import DateRangeTabs from "../components/DateRangeTabs";
import SummaryPanel from "../components/SummaryPanel";
import Toast from "../components/Toast";

import { expenseApi } from "../services/expenseApi";
import { lastNDays } from "../utils/dateRanges";

// export default function Dashboard() {
//   // ===== RANGE STATE =====
//   const [range, setRange] = useState(lastNDays(7));
//   const [label, setLabel] = useState("1 Week");

//   // ===== DATA STATE =====
//   const [expenses, setExpenses] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [category, setCategory] = useState([]);

//   // ===== UI STATE =====
//   const [toastMsg, setToastMsg] = useState("");

//   // ===== LOAD DATA =====
//   const loadData = async (r = range) => {
//     try {
//       const [expRes, totalRes, grandRes, catRes] = await Promise.all([
//         expenseApi.list(r.start, r.end),
//         expenseApi.total(r.start, r.end),
//         expenseApi.grandTotal(),
//         expenseApi.category(r.start, r.end),
//       ]);

//       setExpenses(expRes.data);
//       setTotal(totalRes.data.total);
//       setGrandTotal(grandRes.data.grand_total);
//       setCategory(catRes.data);
//     } catch (err) {
//       console.error(err);
//       setToastMsg("Failed to load data");
//       setTimeout(() => setToastMsg(""), 2500);
//     }
//   };

//   // ===== INITIAL LOAD =====
//   useEffect(() => {
//     loadData();
//   }, []);

//   // ===== ADD EXPENSE =====
//   const handleAddExpenses = async (rows) => {
//     try {
//       const payload = {
//         items: rows.map((r) => ({
//           ...r,
//           amount: Number(r.amount),
//         })),
//       };

//       await expenseApi.add(payload);
//       setToastMsg("Expenses added successfully");
//       loadData();
//     } catch (err) {
//       console.error(err);
//       setToastMsg("Failed to add expenses");
//     } finally {
//       setTimeout(() => setToastMsg(""), 2500);
//     }
//   };

//   // ===== DELETE EXPENSE =====
//   const handleDelete = async (id) => {
//     try {
//       await expenseApi.delete(id);
//       setToastMsg("Expense deleted");
//       loadData();
//     } catch (err) {
//       console.error(err);
//       setToastMsg("Delete failed");
//     } finally {
//       setTimeout(() => setToastMsg(""), 2500);
//     }
//   };

//   return (
//     <div className="p-3 md:p-4 lg:p-6 bg-gray-100 min-h-screen">
//       {/* ===== HEADER ===== */}
//       <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-5 flex items-center gap-2">
//         💰 Money Tracker
//       </h1>

//       {/* ===== ADD FORM ===== */}
//       <AddExpenseForm
//         onSave={handleAddExpenses}
//         grandTotal={grandTotal}
//       />

//       {/* ===== DATE RANGE TABS ===== */}
//       <div className="mt-4 md:mt-6">
//       <DateRangeTabs
//         active={label}
//         onChange={(r) => {
//           const newRange = lastNDays(r.days);
//           setLabel(r.label);
//           setRange(newRange);
//           loadData(newRange);
//         }}
//       />
//       </div>

//       {/* ===== TABLE + SUMMARY ===== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
//         {/* TABLE */}

//         {/* SUMMARY PANEL */}
//         <SummaryPanel
//           total={total}
//           label={label}
//           grandTotal={grandTotal}
//           categoryData={category}
//         />
//         <div className="lg:col-span-2">
//           {/* <ExpenseTable
//             data={expenses}
//             onDelete={handleDelete}
//           /> */}
//           <ExpenseTable
//             data={expenses}
//             onDelete={handleDelete}
//             onUpdate={async (id, payload) => {
//                 await expenseApi.update(id, payload);
//                 setToastMsg("Expense updated");
//                 loadData();
//                 setTimeout(() => setToastMsg(""), 2000);
//             }}
//             />

//         </div>

        
//       </div>

//       {/* ===== TOAST MESSAGE ===== */}
//       <Toast message={toastMsg} />
//     </div>
//   );
// }

// export default function Dashboard() {
//   // ===== RANGE STATE =====
//   const [range, setRange] = useState(lastNDays(7));
//   const [label, setLabel] = useState("1 Week");

//   // ===== DATA STATE =====
//   const [expenses, setExpenses] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [category, setCategory] = useState([]);

//   // ===== UI STATE =====
//   const [toastMsg, setToastMsg] = useState("");

//   // ===== LOAD DATA =====
//   const loadData = async (r = range) => {
//     try {
//       const [expRes, totalRes, grandRes, catRes] = await Promise.all([
//         expenseApi.list(r.start, r.end),
//         expenseApi.total(r.start, r.end),
//         expenseApi.grandTotal(),
//         expenseApi.category(r.start, r.end),
//       ]);

//       setExpenses(expRes.data);
//       setTotal(totalRes.data.total);
//       setGrandTotal(grandRes.data.grand_total);
//       setCategory(catRes.data);
//     } catch (err) {
//       console.error(err);
//       setToastMsg("Failed to load data");
//       setTimeout(() => setToastMsg(""), 2500);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ===== ADD EXPENSE =====
//   const handleAddExpenses = async (rows) => {
//     try {
//       const payload = {
//         items: rows.map((r) => ({
//           ...r,
//           amount: Number(r.amount),
//         })),
//       };

//       await expenseApi.add(payload);
//       setToastMsg("Expenses added successfully");
//       loadData();
//     } catch (err) {
//       console.error(err);
//       setToastMsg("Failed to add expenses");
//     } finally {
//       setTimeout(() => setToastMsg(""), 2500);
//     }
//   };

//   // ===== DELETE =====
//   const handleDelete = async (id) => {
//     try {
//       await expenseApi.delete(id);
//       setToastMsg("Expense deleted");
//       loadData();
//     } catch (err) {
//       console.error(err);
//       setToastMsg("Delete failed");
//     } finally {
//       setTimeout(() => setToastMsg(""), 2500);
//     }
//   };

//   return (
//     <div className="p-3 md:p-4 lg:p-6 bg-gray-100 min-h-screen">

//       {/* ===== HEADER ===== */}
//       <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 flex items-center gap-2">
//         💰 Money Tracker
//       </h1>

//       {/* ===== ADD FORM ===== */}
//       <AddExpenseForm
//         onSave={handleAddExpenses}
//         grandTotal={grandTotal}
//       />

//       {/* ===== DATE RANGE ===== */}
//       <div className="mt-10 flex justify-center">
//         <DateRangeTabs
//           active={label}
//           onChange={(r) => {
//             const newRange = lastNDays(r.days);
//             setLabel(r.label);
//             setRange(newRange);
//             loadData(newRange);
//           }}
//         />
//       </div>

//       {/* ===== SUMMARY + TABLE SECTION ===== */}
//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

//         {/* SUMMARY */}
//         <div className="lg:col-span-4 flex flex-col h-full">
//           <SummaryPanel
//             total={total}
//             label={label}
//             grandTotal={grandTotal}
//             categoryData={category}
//           />
//         </div>

//         {/* TABLE */}
//         <div className="lg:col-span-8 flex flex-col h-full">
//           <ExpenseTable
//             data={expenses}
//             onDelete={handleDelete}
//             onUpdate={async (id, payload) => {
//               await expenseApi.update(id, payload);
//               setToastMsg("Expense updated");
//               loadData();
//               setTimeout(() => setToastMsg(""), 2000);
//             }}
//           />
//         </div>

//       </div>

//       {/* ===== TOAST ===== */}
//       <Toast message={toastMsg} />
//     </div>
//   );
// }






export default function Dashboard() {
  // ===== RANGE STATE =====
  const [range, setRange] = useState(lastNDays(7));
  const [label, setLabel] = useState("1 Week");

  // ===== DATA STATE =====
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [category, setCategory] = useState([]);

  // ===== UI STATE =====
  const [toastMsg, setToastMsg] = useState("");

  // ===== LOAD DATA =====
  const loadData = async (r = range) => {
    try {
      const [expRes, totalRes, grandRes, catRes] = await Promise.all([
        expenseApi.list(r.start, r.end),
        expenseApi.total(r.start, r.end),
        expenseApi.grandTotal(),
        expenseApi.category(r.start, r.end),
      ]);

      setExpenses(expRes.data);
      setTotal(totalRes.data.total);
      setGrandTotal(grandRes.data.grand_total);
      setCategory(catRes.data);
    } catch (err) {
      console.error(err);
      setToastMsg("Failed to load data");
      setTimeout(() => setToastMsg(""), 2500);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ===== ADD EXPENSE =====
  const handleAddExpenses = async (rows) => {
    try {
      const payload = {
        items: rows.map((r) => ({
          ...r,
          amount: Number(r.amount),
        })),
      };

      await expenseApi.add(payload);
      setToastMsg("Expenses added successfully");
      loadData();
    } catch (err) {
      console.error(err);
      setToastMsg("Failed to add expenses");
    } finally {
      setTimeout(() => setToastMsg(""), 2500);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    try {
      await expenseApi.delete(id);
      setToastMsg("Expense deleted");
      loadData();
    } catch (err) {
      console.error(err);
      setToastMsg("Delete failed");
    } finally {
      setTimeout(() => setToastMsg(""), 2500);
    }
  };

  return (
    <div className="p-3 md:p-4 lg:p-6 bg-gray-100 min-h-screen">

      {/* ===== HEADER ===== */}
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 flex items-center gap-2">
        💰 Money Tracker
      </h1>

      {/* ===== ADD FORM ===== */}
      <AddExpenseForm
        onSave={handleAddExpenses}
        grandTotal={grandTotal}
      />

      {/* ===== DATE RANGE ===== */}
      <div className="mt-10 flex justify-center">
        <DateRangeTabs
          active={label}
          onChange={(r) => {
            const newRange = lastNDays(r.days);
            setLabel(r.label);
            setRange(newRange);
            loadData(newRange);
          }}
        />
      </div>

      
      {/* ===== SUMMARY + TABLE ===== */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 items-start">

        {/* SUMMARY (NATURAL HEIGHT) */}
        <div className="lg:w-4/12 shrink-0">
            <SummaryPanel
            total={total}
            label={label}
            grandTotal={grandTotal}
            categoryData={category}
            />
        </div>

        {/* TABLE (FOLLOWS SUMMARY HEIGHT) */}
        <div className="lg:w-8/12">
            <ExpenseTable
            data={expenses}
            onDelete={handleDelete}
            onUpdate={async (id, payload) => {
                await expenseApi.update(id, payload);
                setToastMsg("Expense updated");
                loadData();
                setTimeout(() => setToastMsg(""), 2000);
            }}
            />
        </div>

</div>


      {/* ===== TOAST ===== */}
      <Toast message={toastMsg} />
    </div>
  );
}
