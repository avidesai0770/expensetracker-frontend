import { ArrowDownRight, ArrowUpRight, Download, Receipt, TrendingDown, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/HoverCard/hoverCard'
import CommonFilter from '../../components/CommonFilter/commonFilter'
import { GetCategoryData } from '../../api/queries/query-functions/category.service'
import { UserTransactionFilterMutation } from '../../api/queries/query-functions/transaction.service'
import type { TransactionFilterDTO, TransactionFilterResponse } from '../../types/Transaction/transaction'
import CommonPagination from '../../components/ui/CommonPagination/commonPagination'
import { exportToExcel } from '../../util/exportToExcel'

const Transactions = () => {

  const { data: categories } = GetCategoryData();
  const { mutate: loadTransactions, data: data } = UserTransactionFilterMutation();
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    keyword: "",
    categoryName: null,
    minAmount: null,
    maxAmount: null,
    sortField: "date",
    sortDirection: "desc",
    includeIncome: true,
    includeExpense: true,
  });

  useEffect(() => {
    loadTransactions(filters)
  }, [filters]);

  const totalPages = Math.ceil(data?.transactions?.length / itemsPerPage);
  const currentTransactions = data?.transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleExport = () => {
    if (!data?.transactions || !data.transactions) {
      alert("No data to export");
      return;
    }

    const excelData = data?.transactions.map((t) => ({
      ID: t.id,
      Name: t.name,
      Type: t.type,
      Category: t.categoryName,
      Amount: t.amount,
      Date: t.date,
    }));

    exportToExcel(excelData, "Transactions_Report");
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-neutral-900">All Transactions</h1>

          </div>
          <p className="text-neutral-600">View and manage all your financial transactions</p>
        </div>
        <Button onClick={handleExport} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200/50 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-neutral-600">Total Transactions</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-neutral-900">{data?.transactions?.length}</p>
            <p className="text-neutral-500">Showing filtered results</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 border-0 text-white shadow-lg shadow-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-100">Total Income</p>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-white">${data?.totalIncome}</p>
            <p className="text-green-100/70">From {data?.transactions.filter(t => t.type === "INCOME").length} transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 via-red-600 to-orange-600 border-0 text-white shadow-lg shadow-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-red-100">Total Expenses</p>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-white">${data?.totalExpense}</p>
            <p className="text-red-100/70">From {data?.transactions.filter(t => t.type === "EXPENSE").length} transactions</p>
          </CardContent>
        </Card>
      </div>
      <CommonFilter categories={categories} filters={filters} setFilters={setFilters} />
      <Card className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200/50 shadow-lg">
        <CardHeader className="border-b border-neutral-200/30">
          <CardTitle>
            {data?.transactions?.length} Transaction{data?.transactions?.length !== 1 ? 's' : ''} Found
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {data?.transactions?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-neutral-900 mb-2">No Transactions Found</h3>
              <p className="text-neutral-600">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentTransactions?.map((transaction: TransactionFilterDTO) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white border-2 border-neutral-200/50 hover:shadow-md hover:border-neutral-300 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
                        ${transaction.type === "INCOME"
                          ? "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30"
                          : "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30"
                        }
                      `}
                    >
                      {transaction.type === "INCOME" ? (
                        <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                      )}
                    </div>
                    <div>
                      <span className="flex items-center gap-2 mt-0.5">{transaction?.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-neutral-600">{transaction.categoryName}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-500">{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {transaction.type === "INCOME" ? "+" : "-"}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <CommonPagination handlePageChange={handlePageChange} handleItemsPerPageChange={handleItemsPerPageChange} totalPages={totalPages} currentPage={currentPage} totalItems={itemsPerPage} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Transactions