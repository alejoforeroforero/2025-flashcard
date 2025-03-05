import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import {
  fetchPaginatedCards,
  getCardsByCategory,
  searchCards,
} from "@/store/card-actions";
import { setPageSize } from "@/store/card-slice";

const Pagination = () => {
  const dispatch = useInfoDispatch();
  const { totalCount, currentPage, pageSize, mode, categoryIdView, query } =
    useInfoSelector((state) => state.cards);

  const user = useInfoSelector((state) => state.user);

  const remainingItems = totalCount - (currentPage + 1) * pageSize;
  const hasNextPage = remainingItems > 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page: number) => {
    if (mode === "all") {
      dispatch(fetchPaginatedCards({ page, userId: user.id }));
    } else if (mode === "category") {
      dispatch(
        getCardsByCategory({
          id: categoryIdView,
          page,
          userId: user.id,
        })
      );
    } else if (mode === "search") {
      dispatch(
        searchCards({
          query,
          page,
          userId: user.id,
        })
      );
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    dispatch(setPageSize(newSize));
    // Fetch cards with new page size
    if (mode === "all") {
      dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
    } else if (mode === "category") {
      dispatch(
        getCardsByCategory({
          id: categoryIdView,
          page: 0,
          userId: user.id,
        })
      );
    } else if (mode === "search") {
      dispatch(
        searchCards({
          query,
          page: 0,
          userId: user.id,
        })
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="bg-primary-light text-secondary px-2 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
      <div>
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

          <div className="flex items-center justify-center gap-4 text-secondary">
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
      </div>
    </>
  );
};

export default Pagination;
