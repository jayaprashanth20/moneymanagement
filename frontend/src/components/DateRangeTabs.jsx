
// const ranges = [
//   { label: "10 Days", days: 10 },
//   { label: "1 Week", days: 7 },
//   { label: "1 Month", days: 30 },
//   { label: "3 Months", days: 90 },
//   { label: "6 Months", days: 180 },
//   { label: "1 Year", days: 365 },
// ];

// export default function DateRangeTabs({ active, onChange }) {
//   return (
//     <div className="flex gap-2 mb-4 flex-wrap">
//       {ranges.map(r => (
//         <button
//           key={r.label}
//           onClick={() => onChange(r)}
//           className={`
//             px-3 md:px-4 py-1.5 md:py-2 
//             rounded-full border 
//             text-xs md:text-sm font-medium
//             transition-all duration-200 ease-in-out
//             focus:outline-none focus:ring-2 focus:ring-black/20
//             active:scale-95

//             ${active === r.label
//               ? "bg-black text-white border-black shadow-md"
//               : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm"}
//           `}
//         >
//           {r.label}
//         </button>
//       ))}
//     </div>
//   );
// }



// const ranges = [
//   { label: "10 Days", days: 10 },
//   { label: "1 Week", days: 7 },
//   { label: "1 Month", days: 30 },
//   { label: "3 Months", days: 90 },
//   { label: "6 Months", days: 180 },
//   { label: "1 Year", days: 365 },
// ];

// export default function DateRangeTabs({ active, onChange }) {
//   return (
//     <div className="relative flex gap-2 mb-4 flex-wrap p-2 rounded-xl
//                     bg-white/60 dark:bg-slate-900/60
//                     backdrop-blur-md shadow-sm">

//       {ranges.map(r => (
//         <button
//           key={r.label}
//           onClick={() => onChange(r)}
//           className={`
//             relative px-4 py-2 rounded-full
//             text-xs md:text-sm font-semibold
//             transition-all duration-300 ease-out
//             focus:outline-none
//             active:scale-95

//             ${active === r.label
//               ? `
//                 text-white
//                 bg-linear-to-r from-teal-500 to-emerald-500
//                 shadow-lg shadow-indigo-500/40
//               `
//               : `
//                 text-slate-700 dark:text-slate-300
//                 hover:bg-white/70 dark:hover:bg-slate-800/70
//               `}
//           `}
//         >
//           {r.label}

//           {/* Animated underline */}
//           <span
//             className={`
//               absolute left-1/2 -bottom-1 h-0.5 w-0
//               bg-linear-to-r from-teal-500 to-emerald-500
//               transition-all duration-300
//               ${active === r.label ? "w-1/2 -translate-x-1/2" : ""}
//             `}
//           />
//         </button>
//       ))}
//     </div>
//   );
// }

const ranges = [
  { label: "10 Days", days: 10 },
  { label: "1 Week", days: 7 },
  { label: "1 Month", days: 30 },
  { label: "3 Months", days: 90 },
  { label: "6 Months", days: 180 },
  { label: "1 Year", days: 365 },
];

export default function DateRangeTabs({ active, onChange }) {
  return (
    <div
      className="
        relative flex gap-2 mb-4 flex-wrap p-2 rounded-2xl
        bg-slate-100 shadow-md
        dark:bg-slate-900/60 dark:backdrop-blur-md
      "
    >
      {ranges.map((r) => (
        <button
          key={r.label}
          onClick={() => onChange(r)}
          className={`
            relative px-4 py-2 rounded-full
            text-xs md:text-sm font-semibold
            transition-all duration-300 ease-out
            focus:outline-none
            active:scale-95

            ${
              active === r.label
                ? `
                  text-white
                  bg-linear-to-r from-teal-500 to-emerald-500
                  shadow-lg shadow-emerald-500/40
                  scale-[1.05]
                `
                : `
                  text-slate-700
                  bg-white
                  hover:bg-slate-200
                  hover:shadow-sm
                  dark:bg-transparent
                  dark:text-slate-300
                  dark:hover:bg-slate-800/70
                `
            }
          `}
        >
          {r.label}

          {/* Animated underline */}
          <span
            className={`
              pointer-events-none
              absolute left-1/2 -bottom-1 h-0.5 w-0
              bg-linear-to-r from-teal-500 to-emerald-500
              transition-all duration-300 ease-out
              ${active === r.label ? "w-1/2 -translate-x-1/2" : ""}
            `}
          />
        </button>
      ))}
    </div>
  );
}
