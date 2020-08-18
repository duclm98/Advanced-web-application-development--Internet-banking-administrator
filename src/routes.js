/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import History from "@material-ui/icons/HistoryOutlined";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LibraryBooksRounded from "@material-ui/icons/LibraryBooksRounded";

import CustomersPage from 'views/Customers/Customers.js';
import EmployeePage from 'views/Employees/Employees.js';
import TransactionHistoryPage from 'views/TransactionHistory/TransactionHistory.js';

const dashboardRoutes = [
  {
    path: "/customers",
    name: "Danh sách khách hàng",
    icon: LibraryBooks,
    component: CustomersPage,
  },
  {
    path: "/employees",
    name: "Danh sách nhân viên",
    icon: LibraryBooksRounded,
    component: EmployeePage,
  },
  {
    path: "/transaction-history",
    name: "Lịch sử giao dịch liên ngân hàng",
    icon: History,
    component: TransactionHistoryPage,
  }
];

export default dashboardRoutes;
