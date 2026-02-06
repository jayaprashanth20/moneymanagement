// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// export default function CategoryPie({ data }) {
//   const colors = ["#000", "#555", "#888", "#aaa"];
//   return (
//     <PieChart width={250} height={250}>
//       <Pie data={data} dataKey="total" nameKey="category" outerRadius={80}>
//         {data.map((_, i) => (
//           <Cell key={i} fill={colors[i % colors.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//     </PieChart>
//   );
// }




// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// export default function CategoryPie({ data }) {
//   const COLORS = [
//     "#4F46E5", // Indigo
//     "#22C55E", // Green
//     "#F97316", // Orange
//     "#EF4444", // Red
//     "#06B6D4", // Cyan
//     "#A855F7", // Purple
//   ];

//   return (
//     <PieChart width={250} height={250}>
//       <Pie
//         data={data}
//         dataKey="total"
//         nameKey="category"
//         outerRadius={85}
//         innerRadius={45}   // 🔥 donut style (optional but looks premium)
//         paddingAngle={3}   // spacing between slices
//       >
//         {data.map((_, i) => (
//           <Cell key={i} fill={COLORS[i % COLORS.length]} />
//         ))}
//       </Pie>

//       <Tooltip
//         cursor={{ fill: "rgba(0,0,0,0.05)" }}
//         contentStyle={{
//           backgroundColor: "#111827", // dark bg
//           borderRadius: "10px",
//           border: "none",
//           padding: "10px 14px",
//           color: "#F9FAFB",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
//         }}
//         itemStyle={{
//           color: "#E5E7EB",
//           fontWeight: 500,
//         }}
//         labelStyle={{
//           color: "#93C5FD",
//           fontWeight: 600,
//           marginBottom: "4px",
//         }}
//       />
//     </PieChart>
//   );
// }


import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#4F46E5", // Indigo
  "#22C55E", // Green
  "#F97316", // Orange
  "#EF4444", // Red
  "#06B6D4", // Cyan
  "#A855F7", // Purple
];

export default function CategoryPie({
  data,
  activeIndex = null,
  setActiveIndex = () => {},
}) {
  const total = data.reduce((sum, d) => sum + d.total, 0);
  
  // Responsive chart dimensions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const chartSize = isMobile ? 200 : 260;

  return (
    <PieChart width={chartSize} height={chartSize}>
      {/* ===== PIE ===== */}
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        innerRadius={isMobile ? 40 : 55}
        outerRadius={isMobile ? 70 : 90}
        paddingAngle={3}
        activeIndex={activeIndex}
        activeShape={{
          outerRadius: 100,
        }}
        onMouseEnter={(_, index) => !isMobile && setActiveIndex(index)}
        onMouseLeave={() => !isMobile && setActiveIndex(null)}
        animationBegin={0}
        animationDuration={900}
        animationEasing="ease-out"
      >
        {data.map((_, i) => (
          <Cell
            key={i}
            fill={COLORS[i % COLORS.length]}
          />
        ))}
      </Pie>

      {/* ===== CENTER TEXT ===== */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x="50%"
          dy="-2"
          fontSize={isMobile ? "10" : "12"}
          fill="#6B7280"
        >
          Total
        </tspan>
        <tspan
          x="50%"
          dy={isMobile ? "16" : "20"}
          fontSize={isMobile ? "13" : "16"}
          fontWeight="700"
          fill="#111827"
        >
          ₹ {total}
        </tspan>
      </text>

      {/* ===== TOOLTIP ===== */}
      <Tooltip
        cursor={{ fill: "rgba(0,0,0,0.04)" }}
        contentStyle={{
          backgroundColor: "#111827",
          borderRadius: "12px",
          border: "none",
          padding: "10px 14px",
          color: "#F9FAFB",
          boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
        }}
        itemStyle={{
          color: "#E5E7EB",
          fontWeight: 600,
        }}
        labelStyle={{
          color: "#93C5FD",
          fontWeight: 600,
          marginBottom: "4px",
        }}
      />
    </PieChart>
  );
}
