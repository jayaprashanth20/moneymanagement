// import { useState, useRef, useEffect } from "react";
// import { FaPlus, FaTimes } from "react-icons/fa";

// const newRow = () => ({
//   name: "",
//   category: "Food",
//   amount: "",
//   payment_type: "Online",
//   expense_date: new Date().toISOString().split("T")[0],
// });

// export default function AddExpenseForm({ onSave, grandTotal }) {
//   const [rows, setRows] = useState([newRow()]);
//   const [showToast, setShowToast] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const nameRefs = useRef([]);

//   const update = (i, k, v) => {
//     const copy = [...rows];
//     copy[i][k] = v;
//     setRows(copy);
//   };

//   // ❗ errors only AFTER submit
//   const rowErrors = rows.map((r) => ({
//     name: submitted && !r.name.trim(),
//     amount: submitted && !r.amount,
//   }));

//   const isValid = rows.every(
//     (r) => r.name.trim() && r.amount
//   );

//   // 🎯 autofocus new row
//   useEffect(() => {
//     nameRefs.current[rows.length - 1]?.focus();
//   }, [rows.length]);

//   const addRow = () => {
//     setRows([...rows, newRow()]);
//     setSubmitted(false); // reset validation
//   };

//   const removeRow = (i) => {
//     if (rows.length === 1) return;
//     setRows(rows.filter((_, idx) => idx !== i));
//   };

//   const handleSave = () => {
//     setSubmitted(true);

//     if (!isValid) return;

//     onSave(rows);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 2000);

//     setRows([newRow()]);
//     setSubmitted(false);
//   };

//   return (
//     <>
//       {/* ================= TOAST ================= */}
//       {showToast && (
//         <div className="
//           fixed top-5 right-5 z-50
//           bg-black text-white text-sm
//           px-4 py-2 rounded-xl shadow-lg
//         ">
//           ✅ Expenses saved successfully
//         </div>
//       )}

//       <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* ================= LEFT ================= */}
//         <div className="lg:col-span-2">
//           <h2 className="font-semibold mb-4 text-sm md:text-base text-gray-800">
//             Add Expenses
//           </h2>

//           <div className="space-y-3">
//             {rows.map((r, i) => {
//               const hasError =
//                 rowErrors[i].name || rowErrors[i].amount;

//               return (
//                 <div
//                   key={i}
//                   className={`
//                     relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2
//                     p-3 rounded-xl border transition
//                     ${
//                       hasError
//                         ? "border-red-300 bg-red-50/40"
//                         : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
//                     }
//                   `}
//                 >
//                   {/* ❌ REMOVE */}
//                   <button
//                     onClick={() => removeRow(i)}
//                     disabled={rows.length === 1}
//                     className="
//                       absolute -top-2 -right-2
//                       bg-white border rounded-full p-1
//                       text-gray-400 hover:text-red-500
//                       shadow transition
//                       disabled:opacity-30
//                     "
//                   >
//                     <FaTimes size={12} />
//                   </button>

//                   <input
//                     ref={(el) => (nameRefs.current[i] = el)}
//                     className={`input text-xs md:text-sm ${
//                       rowErrors[i].name && "border-red-400"
//                     }`}
//                     placeholder="Name *"
//                     value={r.name}
//                     onChange={(e) => update(i, "name", e.target.value)}
//                   />

//                   <select
//                     className="input text-xs md:text-sm"
//                     value={r.category}
//                     onChange={(e) =>
//                       update(i, "category", e.target.value)
//                     }
//                   >
//                     <option>Food</option>
//                     <option>Travel</option>
//                     <option>Education</option>
//                     <option>Digital</option>
//                   </select>

//                   <input
//                     type="date"
//                     className="input text-xs md:text-sm col-span-2 sm:col-span-1"
//                     value={r.expense_date}
//                     onChange={(e) =>
//                       update(i, "expense_date", e.target.value)
//                     }
//                   />

//                   <input
//                     type="number"
//                     className={`input text-xs md:text-sm ${
//                       rowErrors[i].amount && "border-red-400"
//                     }`}
//                     placeholder="Amount *"
//                     value={r.amount}
//                     onChange={(e) =>
//                       update(i, "amount", e.target.value)
//                     }
//                   />

//                   <select
//                     className="input text-xs md:text-sm"
//                     value={r.payment_type}
//                     onChange={(e) =>
//                       update(i, "payment_type", e.target.value)
//                     }
//                     onKeyDown={(e) => {
//                       if (
//                         e.key === "Tab" &&
//                         i === rows.length - 1
//                       ) {
//                         addRow();
//                       }
//                     }}
//                   >
//                     <option>Online</option>
//                     <option>Cash</option>
//                   </select>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ===== ACTIONS ===== */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
//             <button
//               onClick={addRow}
//               className="
//                 text-indigo-600 flex items-center justify-center sm:justify-start
//                 gap-2 text-sm md:text-base font-medium
//                 hover:text-indigo-700 transition
//               "
//             >
//               <FaPlus /> Add Item
//             </button>

//             <button
//               onClick={handleSave}
//               className={`
//                 px-4 md:px-6 py-2 rounded-xl text-sm md:text-base transition-all
//                 ${
//                   isValid
//                     ? "bg-black text-white hover:scale-105"
//                     : "bg-gray-300 text-gray-500"
//                 }
//               `}
//             >
//               Save
//             </button>
//           </div>

//           {submitted && !isValid && (
//             <p className="text-xs text-red-500 mt-2">
//               Please fill all required fields (*) before saving
//             </p>
//           )}
//         </div>

//         {/* ================= RIGHT ================= */}
//         <div className="
//           bg-gradient-to-br from-indigo-50 to-blue-50
//           rounded-xl flex flex-col justify-center items-center
//           p-4 md:p-5
//         ">
//           <p className="text-gray-500 text-xs md:text-sm">
//             Lifetime Spend
//           </p>
//           <p className="text-xl md:text-2xl font-bold mt-2 text-indigo-700">
//             ₹ {grandTotal}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }




// import { useState, useRef, useEffect } from "react";
// import { FaPlus, FaTimes } from "react-icons/fa";

// const newRow = () => ({
//   name: "",
//   category: "Food",
//   amount: "",
//   payment_type: "Online",
//   expense_date: new Date().toISOString().split("T")[0],
// });

// export default function AddExpenseForm({ onSave, grandTotal }) {
//   const [rows, setRows] = useState([newRow()]);
//   const [showToast, setShowToast] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const nameRefs = useRef([]);

//   const update = (i, k, v) => {
//     const copy = [...rows];
//     copy[i][k] = v;
//     setRows(copy);
//   };

//   const rowErrors = rows.map((r) => ({
//     name: submitted && !r.name.trim(),
//     amount: submitted && !r.amount,
//   }));

//   const isValid = rows.every((r) => r.name.trim() && r.amount);

//   useEffect(() => {
//     nameRefs.current[rows.length - 1]?.focus();
//   }, [rows.length]);

//   const addRow = () => {
//     setRows([...rows, newRow()]);
//     setSubmitted(false);
//   };

//   const removeRow = (i) => {
//     if (rows.length === 1) return;
//     setRows(rows.filter((_, idx) => idx !== i));
//   };

//   const handleSave = () => {
//     setSubmitted(true);
//     if (!isValid) return;

//     onSave(rows);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 2000);

//     setRows([newRow()]);
//     setSubmitted(false);
//   };

//   return (
//     <>
//       {/* ===== SINGLE TOAST (UPGRADED) ===== */}
//       {showToast && (
//         <div
//           className="
//             fixed top-5 right-5 z-50
//             bg-linear-to-r from-emerald-500 to-green-500
//             text-white text-sm
//             px-5 py-3 rounded-2xl shadow-xl
//             animate-slide-in
//           "
//         >
//           ✅ Expenses saved successfully
//         </div>
//       )}

//       <div
//         className="
//           bg-white/70 backdrop-blur-xl
//           rounded-2xl shadow-xl
//           p-4 md:p-5
//           grid grid-cols-1 lg:grid-cols-3 gap-4
//         "
//       >
//         {/* ===== LEFT ===== */}
//         <div className="lg:col-span-2">
//           <h2 className="font-semibold mb-4 text-sm md:text-base text-slate-800">
//             Add Expenses
//           </h2>

//           <div className="space-y-3">
//             {rows.map((r, i) => {
//               const hasError =
//                 rowErrors[i].name || rowErrors[i].amount;

//               return (
//                 <div
//                   key={i}
//                   className={`
//                     relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2
//                     p-3 rounded-xl border transition-all
//                     ${
//                       hasError
//                         ? "border-red-300 bg-red-50/40"
//                         : "border-slate-200 bg-linear-to-br from-white to-slate-50"
//                     }
//                   `}
//                 >
//                   {/* REMOVE */}
//                   <button
//                     onClick={() => removeRow(i)}
//                     disabled={rows.length === 1}
//                     className="
//                       absolute -top-2 -right-2
//                       bg-white border rounded-full p-1
//                       text-slate-400 hover:text-red-500
//                       shadow transition
//                       disabled:opacity-30
//                     "
//                   >
//                     <FaTimes size={12} />
//                   </button>

//                   <input
//                     ref={(el) => (nameRefs.current[i] = el)}
//                     className={`input text-xs md:text-sm ${
//                       rowErrors[i].name && "border-red-400"
//                     }`}
//                     placeholder="Name *"
//                     value={r.name}
//                     onChange={(e) =>
//                       update(i, "name", e.target.value)
//                     }
//                   />

//                   <select
//                     className="input text-xs md:text-sm"
//                     value={r.category}
//                     onChange={(e) =>
//                       update(i, "category", e.target.value)
//                     }
//                   >
//                     <option>Food</option>
//                     <option>Travel</option>
//                     <option>Education</option>
//                     <option>Digital</option>
//                   </select>

//                   <input
//                     type="date"
//                     className="input text-xs md:text-sm col-span-2 sm:col-span-1"
//                     value={r.expense_date}
//                     onChange={(e) =>
//                       update(i, "expense_date", e.target.value)
//                     }
//                   />

//                   <input
//                     type="number"
//                     className={`input text-xs md:text-sm ${
//                       rowErrors[i].amount && "border-red-400"
//                     }`}
//                     placeholder="Amount *"
//                     value={r.amount}
//                     onChange={(e) =>
//                       update(i, "amount", e.target.value)
//                     }
//                   />

//                   <select
//                     className="input text-xs md:text-sm"
//                     value={r.payment_type}
//                     onChange={(e) =>
//                       update(i, "payment_type", e.target.value)
//                     }
//                     onKeyDown={(e) => {
//                       if (
//                         e.key === "Tab" &&
//                         i === rows.length - 1
//                       ) {
//                         addRow();
//                       }
//                     }}
//                   >
//                     <option>Online</option>
//                     <option>Cash</option>
//                   </select>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ACTIONS */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
//             <button
//               onClick={addRow}
//               className="
//                 text-emerald-600 flex items-center gap-2
//                 text-sm md:text-base font-medium
//                 hover:text-emerald-700 transition
//               "
//             >
//               <FaPlus /> Add Item
//             </button>

//             <button
//               onClick={handleSave}
//               className={`
//                 px-5 py-2 rounded-xl text-sm md:text-base
//                 transition-all
//                 ${
//                   isValid
//                     ? "bg-linear-to-r from-slate-900 to-slate-800 text-white hover:scale-105"
//                     : "bg-slate-300 text-slate-500"
//                 }
//               `}
//             >
//               Save
//             </button>
//           </div>
//         </div>

//         {/* ===== RIGHT ===== */}
//         <div
//           className="
//             bg-linear-to-br from-emerald-50 to-teal-50
//             rounded-xl flex flex-col justify-center items-center
//             p-4 md:p-5
//           "
//         >
//           <p className="text-slate-500 text-xs md:text-sm">
//             Lifetime Spend
//           </p>
//           <p className="text-xl md:text-2xl font-bold mt-2 text-emerald-700">
//             ₹ {grandTotal}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Toast from "./Toast"; // ✅ use reusable toast

const newRow = () => ({
  name: "",
  category: "Food",
  amount: "",
  payment_type: "Online",
  expense_date: new Date().toISOString().split("T")[0],
});

export default function AddExpenseForm({ onSave, grandTotal }) {
  const [rows, setRows] = useState([newRow()]);
  const [showToast, setShowToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameRefs = useRef([]);

  const update = (i, k, v) => {
    const copy = [...rows];
    copy[i][k] = v;
    setRows(copy);
  };

  // ❗ validate only after submit
  const rowErrors = rows.map((r) => ({
    name: submitted && !r.name.trim(),
    amount: submitted && !r.amount,
  }));

  const isValid = rows.every((r) => r.name.trim() && r.amount);

  // 🎯 autofocus new row
  useEffect(() => {
    nameRefs.current[rows.length - 1]?.focus();
  }, [rows.length]);

  const addRow = () => {
    setRows([...rows, newRow()]);
    setSubmitted(false);
  };

  const removeRow = (i) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, idx) => idx !== i));
  };

  const handleSave = () => {
    setSubmitted(true);
    if (!isValid) return;

    onSave(rows);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    setRows([newRow()]);
    setSubmitted(false);
  };

  return (
    <>
      {/* ===== TOAST (REUSABLE) ===== */}
      <Toast
        message={showToast ? "Expenses saved successfully" : ""}
      />

      <div
        className="
          bg-white/70 backdrop-blur-xl
          rounded-2xl shadow-xl
          p-4 md:p-5
          grid grid-cols-1 lg:grid-cols-3 gap-4
        "
      >
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold mb-4 text-sm md:text-base text-slate-800">
            Add Expenses
          </h2>

          <div className="space-y-3">
            {rows.map((r, i) => {
              const hasError =
                rowErrors[i].name || rowErrors[i].amount;

              return (
                <div
                  key={i}
                  className={`
                    relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2
                    p-3 rounded-xl border transition-all
                    ${
                      hasError
                        ? "border-red-300 bg-red-50/40"
                        : "border-slate-200 bg-gradient-to-br from-white to-slate-50"
                    }
                  `}
                >
                  {/* ❌ REMOVE ROW */}
                  <button
                    onClick={() => removeRow(i)}
                    disabled={rows.length === 1}
                    className="
                      absolute -top-2 -right-2
                      bg-white border rounded-full p-1
                      text-slate-400 hover:text-red-500
                      shadow transition
                      disabled:opacity-30
                    "
                  >
                    <FaTimes size={12} />
                  </button>

                  {/* NAME */}
                  <input
                    ref={(el) => (nameRefs.current[i] = el)}
                    className={`input text-xs md:text-sm ${
                      rowErrors[i].name && "border-red-400"
                    }`}
                    placeholder="Name *"
                    value={r.name}
                    onChange={(e) =>
                      update(i, "name", e.target.value)
                    }
                  />

                  {/* CATEGORY */}
                  <select
                    className="input text-xs md:text-sm"
                    value={r.category}
                    onChange={(e) =>
                      update(i, "category", e.target.value)
                    }
                  >
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Education</option>
                    <option>Digital</option>
                  </select>

                  {/* DATE */}
                  <input
                    type="date"
                    className="input text-xs md:text-sm col-span-2 sm:col-span-1"
                    value={r.expense_date}
                    onChange={(e) =>
                      update(i, "expense_date", e.target.value)
                    }
                  />

                  {/* AMOUNT */}
                  <input
                    type="number"
                    className={`input text-xs md:text-sm ${
                      rowErrors[i].amount && "border-red-400"
                    }`}
                    placeholder="Amount *"
                    value={r.amount}
                    onChange={(e) =>
                      update(i, "amount", e.target.value)
                    }
                  />

                  {/* PAYMENT TYPE */}
                  <select
                    className="input text-xs md:text-sm"
                    value={r.payment_type}
                    onChange={(e) =>
                      update(i, "payment_type", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Tab" &&
                        i === rows.length - 1
                      ) {
                        addRow();
                      }
                    }}
                  >
                    <option>Online</option>
                    <option>Cash</option>
                  </select>
                </div>
              );
            })}
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
            <button
              onClick={addRow}
              className="
                text-emerald-600 flex items-center gap-2
                text-sm md:text-base font-medium
                hover:text-emerald-700 transition
              "
            >
              <FaPlus /> Add Item
            </button>

            <button
              onClick={handleSave}
              className={`
                px-5 py-2 rounded-xl text-sm md:text-base
                transition-all
                ${
                  isValid
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:scale-105"
                    : "bg-slate-300 text-slate-500"
                }
              `}
            >
              Save
            </button>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          className="
            bg-gradient-to-br from-emerald-50 to-teal-50
            rounded-xl flex flex-col justify-center items-center
            p-4 md:p-5
          "
        >
          <p className="text-slate-500 text-xs md:text-sm">
            Lifetime Spend
          </p>
          <p className="text-xl md:text-2xl font-bold mt-2 text-emerald-700">
            ₹ {grandTotal}
          </p>
        </div>
      </div>
    </>
  );
}
