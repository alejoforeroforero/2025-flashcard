import { PAGE_SIZE } from "@/store/card-actions";

type PaginationType = {
  currentPage: number;
  totalCount: number;
  handlePageChange: (currentPage: number) => void;
};

const Pagination = ({
  currentPage,
  totalCount,
  handlePageChange,
}: PaginationType) => {
  const remainingItems = totalCount - (currentPage + 1) * PAGE_SIZE;
  const hasNextPage = remainingItems > 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="flex items-center justify-between mt-5 px-2">
      <div className="flex-1 flex justify-start">
        {currentPage > 0 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-primary-light hover:bg-primary-light/80 text-secondary px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            Previous
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-center text-secondary">
        <span className="text-sm">
          Page {currentPage + 1} of {Math.max(1, totalPages)}
        </span>
      </div>
      
      <div className="flex-1 flex justify-end">
        {hasNextPage && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-primary-light hover:bg-primary-light/80 text-secondary px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
