import "./Pagination.css";
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

  return (
    <>
      <div id="pagination">
        <p>
          {currentPage > 0 && (
            <button
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
        </p>
        <p>
          <span>
            Page {currentPage + 1} of{" "}
            {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
          </span>
        </p>
        <p>
          {hasNextPage && (
            <button
              disabled={!hasNextPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </p>
      </div>
    </>
  );
};

export default Pagination;
