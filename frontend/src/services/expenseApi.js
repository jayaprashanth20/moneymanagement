// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000", // change later for Render
// });

// export const expenseApi = {
//   getExpenses: (start, end) =>
//     API.get("/expenses", { params: { start_date: start, end_date: end } }),

//   getTotal: (start, end) =>
//     API.get("/expenses/total", { params: { start_date: start, end_date: end } }),

//   getCategorySummary: (start, end) =>
//     API.get("/expenses/category-summary", {
//       params: { start_date: start, end_date: end },
//     }),

//   getGrandTotal: () => API.get("/expenses/grand-total"),

//   addExpenses: (payload) => API.post("/expenses", payload),

//   updateExpense: (id, payload) =>
//     API.put(`/expenses/${id}`, payload),

//   deleteExpense: (id) =>
//     API.delete(`/expenses/${id}`),
// };

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // true only if using cookies
});

export const expenseApi = {
  add: (data) => api.post("/expenses", data),

  list: (start, end) =>
    api.get("/expenses", {
      params: { start_date: start, end_date: end },
    }),

  total: (start, end) =>
    api.get("/expenses/total", {
      params: { start_date: start, end_date: end },
    }),

  category: (start, end) =>
    api.get("/expenses/category-summary", {
      params: { start_date: start, end_date: end },
    }),

  monthly: () => api.get("/expenses/monthly-summary"),

  grandTotal: () => api.get("/expenses/grand-total"),

  delete: (id) => api.delete(`/expenses/${id}`),

  update: (id, data) => api.put(`/expenses/${id}`, data),
};

