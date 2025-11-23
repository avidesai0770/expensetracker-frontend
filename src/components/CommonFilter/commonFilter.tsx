import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/HoverCard/hoverCard";
import { Calendar, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/Button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/DropDrown/dropDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CommonFilterProps {
    filters: any;
    setFilters: (value: any) => void; // FIXED
    categories?: any[];
}

const CommonFilter = ({ filters, setFilters, categories = [] }: CommonFilterProps) => {
    const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
    const [filterCategory, setFilterCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("date-desc");
    const [showFilters, setShowFilters] = useState(false);

    const activeFiltersCount = [
        filters.keyword !== "",
        filters.categoryName !== null,
        filterType !== "all",
        filters.startDate !== "",
        filters.endDate !== "",
    ].filter(Boolean).length;

    const handleSearch = (e: any) => {
        setFilters((prev: any) => ({
            ...prev,
            keyword: e.target.value,
        }));
    };


    const handleCategoryChange = (value: string) => {
        setFilterCategory(value);
        setFilters((prev: any) => ({
            ...prev,
            categoryName: value === "All Categories" ? null : value,
        }));
    };


    const handleTypeFilter = (type: "all" | "income" | "expense") => {
        setFilterType(type);
        setFilters((prev: any) => ({
            ...prev,
            includeIncome: type === "income" || type === "all",
            includeExpense: type === "expense" || type === "all",
        }));
    };


    const handleSortChange = (value: string) => {
        setSortBy(value);
        setFilters((prev: any) => ({
            ...prev,
            sortField: value.includes("date") ? "date" : "amount",
            sortDirection: value.includes("asc") ? "asc" : "desc",
        }));
    };


    const handleStartDate = (value: any) => {
        const formatted = value ? value.format("YYYY-MM-DD") : "";
        setFilters((prev: any) => ({ ...prev, startDate: formatted }));
    };


    const handleEndDate = (value: any) => {
        const formatted = value ? value.format("YYYY-MM-DD") : "";
        setFilters((prev: any) => ({ ...prev, endDate: formatted }));
    };


    const clearAll = () => {
        setFilterType("all");
        setFilterCategory("All Categories");
        setSortBy("date-desc");

        setFilters({
            keyword: "",
            categoryName: null,
            includeIncome: true,
            includeExpense: true,
            startDate: "",
            endDate: "",
            sortField: "date",
            sortDirection: "desc",
        });
    };

    return (
        <Card className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200/50 shadow-lg">
            <CardHeader className="border-b border-neutral-200/30">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                        Filters & Search
                        {activeFiltersCount > 0 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                {activeFiltersCount}
                            </span>
                        )}
                    </CardTitle>

                    <div className="flex gap-2">
                        {activeFiltersCount > 0 && (
                            <Button variant="outline" size="sm" className="border-neutral-200" onClick={clearAll}>
                                <X className="w-4 h-4 mr-1" />
                                Clear All
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="border-neutral-200"
                        >
                            <Filter className="w-4 h-4 mr-1" />
                            {showFilters ? "Hide" : "Show"} Filters
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-1">
                <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        placeholder="Search transactions by description or category..."
                        value={filters.keyword}
                        onChange={handleSearch}
                        className="pl-12 h-12 w-full bg-white border-2 border-neutral-200 focus:border-blue-500 rounded-xl"
                    />
                </div>

                {showFilters && (
                    <div className="space-y-4 pt-4 border-t border-neutral-200/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* TRANSACTION TYPE */}
                            <div className="space-y-2">
                                <label>Transaction Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button
                                        variant={filterType === "all" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleTypeFilter("all")}
                                    >
                                        All
                                    </Button>

                                    <Button
                                        variant={filterType === "income" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleTypeFilter("income")}
                                        className={filterType === "income" ? "bg-green-600 hover:bg-green-700" : ""}
                                    >
                                        Income
                                    </Button>

                                    <Button
                                        variant={filterType === "expense" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleTypeFilter("expense")}
                                        className={filterType === "expense" ? "bg-red-600 hover:bg-red-700" : ""}
                                    >
                                        Expense
                                    </Button>
                                </div>
                            </div>

                            {/* CATEGORY FILTER */}
                            <div className="space-y-2">
                                <label>Category</label>
                                <Select value={filterCategory} onValueChange={handleCategoryChange}>
                                    <SelectTrigger className="h-10 bg-white border-2 border-neutral-200 rounded-lg">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>

                                    <SelectContent className="rounded-lg border-2 border-neutral-200">
                                        <SelectItem value="All Categories">All Categories</SelectItem>
                                        {categories.map((cat: any) => (
                                            <SelectItem key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* SORT */}
                            <div className="space-y-2">
                                <label>Sort By</label>

                                <Select value={sortBy} onValueChange={handleSortChange}>
                                    <SelectTrigger className="h-10 bg-white border-2 border-neutral-200 rounded-lg">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="date-desc">Date (Newest)</SelectItem>
                                        <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                                        <SelectItem value="amount-desc">Amount (High → Low)</SelectItem>
                                        <SelectItem value="amount-asc">Amount (Low → High)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* DATE RANGE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label>From Date</label>
                                <DatePicker format="DD,MM,YYYY"
                                    value={filters.startDate ? filters.startDate : null}
                                    onChange={handleStartDate} slotProps={{ textField: { fullWidth: true, size: "small", InputProps: { startAdornment: <Calendar style={{ marginRight: 8 }} />, }, sx: { backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { border: "2px solid #e5e7eb", }, }, }, }} />
                            </div>

                            <div className="space-y-2">
                                <label>To Date</label>
                                <DatePicker format="DD,MM,YYYY" value={filters.endDate ? filters.endDate : null}
                                    onChange={handleEndDate} slotProps={{ textField: { fullWidth: true, size: "small", InputProps: { startAdornment: <Calendar style={{ marginRight: 8 }} />, }, sx: { backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { border: "2px solid #e5e7eb", }, }, }, }} />
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CommonFilter;
