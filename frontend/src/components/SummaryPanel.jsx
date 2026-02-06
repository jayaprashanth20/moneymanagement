
import { useState } from "react";
import CategoryPie from "./PieChart";

const CATEGORY_COLORS = [
  "#4F46E5", // Indigo
  "#22C55E", // Green
  "#F97316", // Orange
  "#EF4444", // Red
  "#06B6D4", // Cyan
  "#A855F7", // Purple
];

export default function SummaryPanel({
  total,
  label,
  grandTotal,
  categoryData,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const computedTotal =
    grandTotal ??
    categoryData.reduce((sum, c) => sum + c.total, 0);

  return (
    <div
      className="
        rounded-2xl p-3 md:p-4 lg:p-5
        bg-white shadow-lg
        dark:bg-gray-900 dark:text-gray-100
        flex flex-col gap-4
      "
    >
      {/* ===== TOTAL CARD ===== */}
      <div
        className="
          rounded-xl p-3 md:p-4
          bg-linear-to-r from-indigo-600 to-purple-600
          text-white shadow-md
        "
      >
        <p className="text-xs md:text-sm opacity-90">
          Total ({label})
        </p>
        <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 tracking-wide">
          ₹ {total}
        </p>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ===== CATEGORY LIST ===== */}
      <div>
        <p className="text-xs md:text-sm font-semibold mb-2 md:mb-3 text-gray-700 dark:text-gray-300">
          Category Breakdown
        </p>

        {categoryData.length === 0 ? (
          <p className="text-gray-400 text-xs md:text-sm">
            No data available
          </p>
        ) : (
          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {categoryData.map((c, i) => {
              const color =
                CATEGORY_COLORS[i % CATEGORY_COLORS.length];
              const percent = computedTotal
                ? ((c.total / computedTotal) * 100).toFixed(1)
                : 0;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`
                    flex justify-between items-center
                    px-3 py-2 rounded-lg cursor-pointer
                    transition-all duration-200
                    ${
                      activeIndex === i
                        ? "bg-indigo-50 dark:bg-gray-800 scale-[1.02]"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className="font-medium"
                      style={{ color }}
                    >
                      {c.category}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <p
                      className="font-semibold"
                      style={{ color }}
                    >
                      ₹ {c.total}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {percent}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== PIE CHART ===== */}
      {categoryData.length > 0 && (
        <div className="pt-2 flex justify-center">
          <CategoryPie
            data={categoryData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      )}
    </div>
  );
}
