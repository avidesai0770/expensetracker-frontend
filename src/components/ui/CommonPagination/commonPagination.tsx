import React from "react";
import { CardContent } from "../HoverCard/hoverCard";
import { Button } from "../Button/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../DropDrown/dropDown";

type Props = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (value: string) => void;
};

const CommonPagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  handlePageChange,
  handleItemsPerPageChange,
}) => {

  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <CardContent className="pt-0 pb-6 border-t border-neutral-200/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">

        {/* Left side: navigation buttons */}
        <div className="flex items-center gap-2">

          {/* First Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 border-neutral-200"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          {/* Previous Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 border-neutral-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Page number buttons */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-2 text-neutral-400">...</span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                  className={`h-9 w-9 p-0 border-neutral-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
                      : ""
                  }`}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          {/* Next Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 border-neutral-200"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Last Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 border-neutral-200"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Right side: items per page */}
        <div className="flex items-center gap-3">
          <label className="text-neutral-600 whitespace-nowrap">
            Rows per page:
          </label>

          <Select value={itemsPerPage?.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="h-9 w-20 bg-white border-2 border-neutral-200 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2 border-neutral-200">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-neutral-600 whitespace-nowrap">
            {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalItems)}
            &nbsp;of {totalItems}
          </span>
        </div>
      </div>
    </CardContent>
  );
};

export default CommonPagination;
