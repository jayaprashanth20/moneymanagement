// export default function Toast({ message }) {
//   if (!message) return null;
//   return (
//     <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 bg-black text-white px-3 md:px-4 py-2 rounded-lg shadow-lg text-xs md:text-sm z-50 max-w-xs">
//       {message}
//     </div>
//   );
// }


// export default function Toast({ message }) {
//   if (!message) return null;

//   return (
//     <div
//       className="
//         fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 max-w-xs
//         px-4 py-2.5 rounded-2xl
//         text-xs md:text-sm font-medium text-white
//         bg-gradient-to-r from-emerald-500 to-teal-500
//         shadow-[-6px_0_18px_rgba(16,185,129,0.45)]
//         animate-slide-in
//       "
//     >
//       {message}
//     </div>
//   );
// }

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      className="
        fixed top-4 right-4 md:top-5 md:right-5 z-50 max-w-xs
        px-4 py-2.5 rounded-2xl
        text-xs md:text-sm font-medium text-white
        bg-gradient-to-r from-emerald-500 to-teal-500
        shadow-[-6px_0_18px_rgba(16,185,129,0.45)]
        animate-slide-in-top
      "
    >
      {message}
    </div>
  );
}
