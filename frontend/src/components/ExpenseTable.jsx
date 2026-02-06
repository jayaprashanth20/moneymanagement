// import { useState } from "react";
// import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

// export default function ExpenseTable({ data, onDelete, onUpdate }) {
//   const [editId, setEditId] = useState(null);
//   const [form, setForm] = useState({});
//   const [confirmId, setConfirmId] = useState(null);
//   const [savedRowId, setSavedRowId] = useState(null);

//   const startEdit = (row) => {
//     setEditId(row.id);
//     setForm({ ...row });
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setForm({});
//   };

//   const saveEdit = () => {
//     onUpdate(editId, {
//       name: form.name,
//       category: form.category,
//       amount: Number(form.amount),
//       expense_date: form.expense_date,
//       payment_type: form.payment_type,
//     });

//     setSavedRowId(editId);
//     setTimeout(() => setSavedRowId(null), 900);
//     cancelEdit();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") saveEdit();
//     if (e.key === "Escape") cancelEdit();
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg mt-4 md:mt-6 overflow-hidden">

//       {/* ================= DESKTOP TABLE ================= */}
//       <div className="hidden md:block">
//         {/* HEADER */}
//         <div className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur border-b border-slate-200/60">
//           <table className="w-full table-fixed">
//             <thead>
//               <tr className="text-slate-700 text-xs md:text-sm font-semibold">
//                 <th className="w-[20%] px-3 md:px-5 py-3 text-left">Date</th>
//                 <th className="w-[20%] px-3 md:px-5 py-3 text-left">Name</th>
//                 <th className="w-[20%] px-3 md:px-5 py-3 text-left">Category</th>
//                 <th className="w-[20%] px-3 md:px-5 py-3 text-right">Amount</th>
//                 <th className="w-[20%] px-3 md:px-5 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//           </table>
//         </div>

//         {/* BODY */}
//         <div className="max-h-[70vh] overflow-y-auto">
//           <table className="w-full table-fixed">
//             <tbody>

//             {data.map((e) => (
//               <tr
//                 key={e.id}
//                 onKeyDown={handleKeyDown}
//                 className={`group transition-all duration-200 border-b border-slate-200/40
//                   ${editId === e.id ? "bg-indigo-50" : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50/40"}
//                   ${savedRowId === e.id ? "bg-green-50/70" : ""}`}
//               >
//                 {/* DATE */}
//                 <td className="w-[20%] px-3 md:px-5 py-3 align-middle text-xs md:text-sm">
//                   {editId === e.id ? (
//                     <input
//                       type="date"
//                       className="w-full border rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-indigo-400"
//                       value={form.expense_date}
//                       onChange={(ev) => setForm({ ...form, expense_date: ev.target.value })}
//                     />
//                   ) : e.expense_date}
//                 </td>

//                 {/* NAME */}
//                 <td className="w-[20%] px-3 md:px-5 py-3 align-middle text-xs md:text-sm">
//                   {editId === e.id ? (
//                     <input
//                       className="w-full border rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-indigo-400"
//                       value={form.name}
//                       onChange={(ev) => setForm({ ...form, name: ev.target.value })}
//                     />
//                   ) : e.name}
//                 </td>

//                 {/* CATEGORY */}
//                 <td className="w-[20%] px-3 md:px-5 py-3 align-middle text-xs md:text-sm">
//                   {editId === e.id ? (
//                     <select
//                       className="w-full border rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-indigo-400"
//                       value={form.category}
//                       onChange={(ev) => setForm({ ...form, category: ev.target.value })}
//                     >
//                       <option>Food</option>
//                       <option>Travel</option>
//                       <option>Education</option>
//                       <option>Digital</option>
//                     </select>
//                   ) : e.category}
//                 </td>

//                 {/* AMOUNT */}
//                 <td className="w-[20%] px-3 md:px-5 py-3 text-right font-medium align-middle text-xs md:text-sm">
//                   {editId === e.id ? (
//                     <input
//                       type="number"
//                       className="w-full border rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm text-right focus:ring-2 focus:ring-indigo-400"
//                       value={form.amount}
//                       onChange={(ev) => setForm({ ...form, amount: ev.target.value })}
//                     />
//                   ) : `₹ ${e.amount}`}
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="w-[20%] px-3 md:px-5 py-3 align-middle">
//                   <div className="flex justify-center items-center min-h-[28px]">
//                     {editId === e.id ? (
//                       <div className="flex gap-4 md:gap-5">
//                         <FaCheck
//                           title="Save (Enter)"
//                           className="text-green-600 cursor-pointer hover:scale-110 transition text-sm md:text-base"
//                           onClick={saveEdit}
//                         />
//                         <FaTimes
//                           title="Cancel (Esc)"
//                           className="text-slate-500 cursor-pointer hover:scale-110 transition text-sm md:text-base"
//                           onClick={cancelEdit}
//                         />
//                       </div>
//                     ) : confirmId === e.id ? (
//                       <div className="flex gap-2 md:gap-3">
//                         <button
//                           className="text-xs bg-red-600 text-white px-2 md:px-3 py-1.5 rounded-lg"
//                           onClick={() => {
//                             onDelete(e.id);
//                             setConfirmId(null);
//                           }}
//                         >
//                           Yes
//                         </button>
//                         <button
//                           className="text-xs border border-slate-300 px-2 md:px-3 py-1.5 rounded-lg"
//                           onClick={() => setConfirmId(null)}
//                         >
//                           No
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex justify-center items-center min-h-[28px]">
//                         <div className="flex gap-5 md:gap-6">
//                           <FaEdit
//                             className="text-indigo-600 cursor-pointer hover:scale-110 transition text-sm md:text-base"
//                             onClick={() => startEdit(e)}
//                           />
//                           <FaTrash
//                             className="text-red-600 cursor-pointer hover:scale-110 transition text-sm md:text-base"
//                             onClick={() => setConfirmId(e.id)}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ================= MOBILE CARD VIEW ================= */}
      // <div className="md:hidden space-y-3 p-3">
      //   {data.map((e) => (
      //     <div
      //       key={e.id}
      //       className={`border rounded-lg p-3 transition-all duration-200
      //         ${editId === e.id ? "bg-indigo-50 border-indigo-300" : "bg-gray-50 border-gray-200"}
      //         ${savedRowId === e.id ? "bg-green-50/70 border-green-300" : ""}`}
      //     >
      //       {/* Header row - Name and Amount */}
      //       <div className="flex justify-between items-start mb-3">
      //         <div className="flex-1">
      //           <p className="text-xs text-gray-500 mb-1">Name</p>
      //           {editId === e.id ? (
      //             <input
      //               className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
      //               value={form.name}
      //               onChange={(ev) => setForm({ ...form, name: ev.target.value })}
      //             />
      //           ) : (
      //             <p className="font-semibold text-sm">{e.name}</p>
      //           )}
      //         </div>
      //         <div className="text-right ml-3">
      //           <p className="text-xs text-gray-500 mb-1">Amount</p>
      //           {editId === e.id ? (
      //             <input
      //               type="number"
      //               className="w-20 border rounded-lg px-2 py-1.5 text-sm text-right focus:ring-2 focus:ring-indigo-400"
      //               value={form.amount}
      //               onChange={(ev) => setForm({ ...form, amount: ev.target.value })}
      //             />
      //           ) : (
      //             <p className="font-bold text-base">₹ {e.amount}</p>
      //           )}
      //         </div>
      //       </div>

      //       {/* Details row - Date and Category */}
      //       <div className="grid grid-cols-2 gap-3 mb-3">
      //         <div>
      //           <p className="text-xs text-gray-500 mb-1">Date</p>
      //           {editId === e.id ? (
      //             <input
      //               type="date"
      //               className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
      //               value={form.expense_date}
      //               onChange={(ev) => setForm({ ...form, expense_date: ev.target.value })}
      //             />
      //           ) : (
      //             <p className="text-sm font-medium">{e.expense_date}</p>
      //           )}
      //         </div>
      //         <div>
      //           <p className="text-xs text-gray-500 mb-1">Category</p>
      //           {editId === e.id ? (
      //             <select
      //               className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
      //               value={form.category}
      //               onChange={(ev) => setForm({ ...form, category: ev.target.value })}
      //             >
      //               <option>Food</option>
      //               <option>Travel</option>
      //               <option>Education</option>
      //               <option>Digital</option>
      //             </select>
      //           ) : (
      //             <p className="text-sm font-medium">{e.category}</p>
      //           )}
      //         </div>
      //       </div>

      //       {/* Actions row */}
      //       <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
      //         {editId === e.id ? (
      //           <>
      //             <button
      //               className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:scale-105 transition"
      //               onClick={saveEdit}
      //             >
      //               <FaCheck /> Save
      //             </button>
      //             <button
      //               className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:scale-105 transition"
      //               onClick={cancelEdit}
      //             >
      //               <FaTimes /> Cancel
      //             </button>
      //           </>
      //         ) : confirmId === e.id ? (
      //           <>
      //             <button
      //               className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg"
      //               onClick={() => {
      //                 onDelete(e.id);
      //                 setConfirmId(null);
      //               }}
      //             >
      //               Delete
      //             </button>
      //             <button
      //               className="text-xs border border-gray-300 px-3 py-1.5 rounded-lg"
      //               onClick={() => setConfirmId(null)}
      //             >
      //               Cancel
      //             </button>
      //           </>
      //         ) : (
      //           <>
      //             <button
      //               className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-600 rounded-lg hover:scale-105 transition"
      //               onClick={() => startEdit(e)}
      //             >
      //               <FaEdit /> Edit
      //             </button>
      //             <button
      //               className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:scale-105 transition"
      //               onClick={() => setConfirmId(e.id)}
      //             >
      //               <FaTrash /> Delete
      //             </button>
      //           </>
      //         )}
      //       </div>
      //     </div>
      //   ))}
      // </div>
//     </div>
//   );
// }



import { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function ExpenseTable({ data, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [confirmId, setConfirmId] = useState(null);
  const [savedRowId, setSavedRowId] = useState(null);
  const CATEGORY_COLOR_MAP = {
  Food: "#F97316",      // Orange
  Travel: "#06B6D4",    // Cyan
  Education: "#4F46E5", // Indigo
  Digital: "#A855F7",   // Purple
};

  const startEdit = (row) => {
    setEditId(row.id);
    setForm({ ...row });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const saveEdit = () => {
    onUpdate(editId, {
      name: form.name,
      category: form.category,
      amount: Number(form.amount),
      expense_date: form.expense_date,
      payment_type: form.payment_type,
    });

    setSavedRowId(editId);
    setTimeout(() => setSavedRowId(null), 900);
    cancelEdit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">

  {/* ===== HEADER ===== */}
  <div className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur border-b border-slate-200/60">
    <table className="w-full table-fixed">
      <thead>
        <tr className="text-slate-700 text-xs md:text-sm font-semibold">
          <th className="w-[20%] px-5 py-3 text-left">Date</th>
          <th className="w-[20%] px-5 py-3 text-left">Name</th>
          <th className="w-[20%] px-5 py-3 text-left">Category</th>
          <th className="w-[20%] px-5 py-3 text-right">Amount</th>
          <th className="w-[20%] px-5 py-3 text-center">Actions</th>
        </tr>
      </thead>
    </table>
  </div>

  {/* ===== BODY ===== */}
  <div className="max-h-[97vh] overflow-y-auto">
    <table className="w-full table-fixed">
      <tbody>
        {data.map((e) => {
          const catColor = CATEGORY_COLOR_MAP[e.category] || "#64748B";

          return (
            <tr
              key={e.id}
              onKeyDown={handleKeyDown}
              className={`
                group transition-all duration-200
                border-b border-slate-200/40
                ${editId === e.id
                  ? "bg-indigo-50"
                  : "hover:bg-slate-50"}
                ${savedRowId === e.id ? "bg-green-50/70" : ""}
              `}
            >
              {/* DATE */}
              <td className="px-5 py-3 text-xs md:text-sm">
                {editId === e.id ? (
                  <input
                    type="date"
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-indigo-400"
                    value={form.expense_date}
                    onChange={(ev) =>
                      setForm({ ...form, expense_date: ev.target.value })
                    }
                  />
                ) : (
                  <span className="font-medium">
                    {e.expense_date}
                  </span>
                )}
              </td>

              {/* NAME */}
              <td className="px-5 py-3 text-xs md:text-sm">
                {editId === e.id ? (
                  <input
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-indigo-400"
                    value={form.name}
                    onChange={(ev) =>
                      setForm({ ...form, name: ev.target.value })
                    }
                  />
                ) : (
                  <span className="font-semibold text-slate-800">
                    {e.name}
                  </span>
                )}
              </td>

              {/* CATEGORY (BADGE) */}
              <td className="px-5 py-3 text-xs md:text-sm">
                {editId === e.id ? (
                  <select
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-indigo-400"
                    value={form.category}
                    onChange={(ev) =>
                      setForm({ ...form, category: ev.target.value })
                    }
                  >
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Education</option>
                    <option>Digital</option>
                  </select>
                ) : (
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${catColor}20`,
                      color: catColor,
                    }}
                  >
                    {e.category}
                  </span>
                )}
              </td>

              {/* AMOUNT */}
              <td className="px-5 py-3 text-right font-semibold text-xs md:text-sm">
                {editId === e.id ? (
                  <input
                    type="number"
                    className="w-full border rounded-lg px-2 py-1.5 text-right focus:ring-2 focus:ring-indigo-400"
                    value={form.amount}
                    onChange={(ev) =>
                      setForm({ ...form, amount: ev.target.value })
                    }
                  />
                ) : (
                  <span className="text-slate-800">
                    ₹ {e.amount}
                  </span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="px-5 py-3">
                <div className="flex justify-center items-center gap-5">
                  {editId === e.id ? (
                    <>
                      <FaCheck
                        className="text-green-600 cursor-pointer hover:scale-110 transition"
                        onClick={saveEdit}
                      />
                      <FaTimes
                        className="text-slate-500 cursor-pointer hover:scale-110 transition"
                        onClick={cancelEdit}
                      />
                    </>
                  ) : confirmId === e.id ? (
                    <>
                      <button
                        className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg"
                        onClick={() => {
                          onDelete(e.id);
                          setConfirmId(null);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="text-xs border px-3 py-1.5 rounded-lg"
                        onClick={() => setConfirmId(null)}
                      >
                        No
                      </button>
                    </>
                  ) : (
                    <>
                      <FaEdit
                        className="text-indigo-600 cursor-pointer hover:scale-110 transition"
                        onClick={() => startEdit(e)}
                      />
                      <FaTrash
                        className="text-red-600 cursor-pointer hover:scale-110 transition"
                        onClick={() => setConfirmId(e.id)}
                      />
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

      

<div className="md:hidden space-y-3 p-2 sm:p-3">
  {data.map((e) => {
    const catColor = CATEGORY_COLOR_MAP[e.category] || "#64748B";

    return (
      <div
        key={e.id}
        className={`
          rounded-xl p-3 border
          transition-all duration-200
          ${editId === e.id
            ? "bg-indigo-50 border-indigo-300"
            : "bg-white border-gray-200"}
          ${savedRowId === e.id ? "bg-green-50/70 border-green-300" : ""}
        `}
      >
        {/* ===== HEADER: NAME + AMOUNT ===== */}
        <div className="flex justify-between items-start gap-3 mb-3">
          {/* NAME */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-500 mb-1">Name</p>
            {editId === e.id ? (
              <input
                className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
                value={form.name}
                onChange={(ev) =>
                  setForm({ ...form, name: ev.target.value })
                }
              />
            ) : (
              <p className="font-semibold text-sm truncate">
                {e.name}
              </p>
            )}
          </div>

          {/* AMOUNT */}
          <div className="text-right shrink-0">
            <p className="text-[11px] text-gray-500 mb-1">Amount</p>
            {editId === e.id ? (
              <input
                type="number"
                className="w-24 border rounded-lg px-2 py-1.5 text-sm text-right focus:ring-2 focus:ring-indigo-400"
                value={form.amount}
                onChange={(ev) =>
                  setForm({ ...form, amount: ev.target.value })
                }
              />
            ) : (
              <p className="font-bold text-base whitespace-nowrap">
                ₹ {e.amount}
              </p>
            )}
          </div>
        </div>

        {/* ===== DETAILS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {/* DATE */}
          <div>
            <p className="text-[11px] text-gray-500 mb-1">Date</p>
            {editId === e.id ? (
              <input
                type="date"
                className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
                value={form.expense_date}
                onChange={(ev) =>
                  setForm({
                    ...form,
                    expense_date: ev.target.value,
                  })
                }
              />
            ) : (
              <p className="text-sm font-medium">
                {e.expense_date}
              </p>
            )}
          </div>

          {/* CATEGORY (COLOR BADGE) */}
          <div>
            <p className="text-[11px] text-gray-500 mb-1">Category</p>

            {editId === e.id ? (
              <select
                className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400"
                value={form.category}
                onChange={(ev) =>
                  setForm({
                    ...form,
                    category: ev.target.value,
                  })
                }
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Education</option>
                <option>Digital</option>
              </select>
            ) : (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `${catColor}20`,
                  color: catColor,
                }}
              >
                {e.category}
              </span>
            )}
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-gray-200">
          {editId === e.id ? (
            <>
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:scale-105 transition"
                onClick={saveEdit}
              >
                <FaCheck /> Save
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:scale-105 transition"
                onClick={cancelEdit}
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : confirmId === e.id ? (
            <>
              <button
                className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg"
                onClick={() => {
                  onDelete(e.id);
                  setConfirmId(null);
                }}
              >
                Delete
              </button>
              <button
                className="text-xs border border-gray-300 px-3 py-1.5 rounded-lg"
                onClick={() => setConfirmId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-600 rounded-lg hover:scale-105 transition"
                onClick={() => startEdit(e)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:scale-105 transition"
                onClick={() => setConfirmId(e.id)}
              >
                <FaTrash /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    );
  })}
</div>


      
      
    </div>
  );
}



