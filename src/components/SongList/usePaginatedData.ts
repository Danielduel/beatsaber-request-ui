import React from "react";

type UsePaginatedDataOptions = {
  initialPageNumber: number;
};
function usePaginatedData<ResponseType, ItemType>(
  getUrl: (page: number) => string,
  flatMapResponseArrToItemArr: (responses: ResponseType[]) => ItemType[],
  options: UsePaginatedDataOptions
) {
  const [pageNumber, setPageNumber] = React.useState(-1);
  const [newPage, setNewPage] = React.useState<ResponseType | null>(null);
  const [pages, setPages] = React.useState<ResponseType[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [results, setResults] = React.useState<ItemType[]>([]);

  const clearData = React.useCallback(() => {
    setPages([]);
    setResults([]);
    setPageNumber(-1);
    setIsFetching(false);
    setIsError(false);
  }, [setPages, setResults, setPageNumber, setIsFetching, setIsError]);

  const fetchPage = React.useCallback((page: number) => {
    setIsFetching(true);
    setIsError(false);
    fetch(getUrl(page))
      .then(res => res.json())
      .then(data => {
        setPageNumber(page);
        setNewPage(data);
        setIsFetching(false);
        setIsError(false);
      })
      .catch(err => {
        setIsFetching(false);
        setIsError(true);
      })
  }, [getUrl, setIsFetching, setIsError, setPages]);

  const initialFetch = React.useCallback(() => {
    fetchPage(options.initialPageNumber);
  }, [options.initialPageNumber, fetchPage]);

  const fetchNextPage = React.useCallback(() => {
    fetchPage(pageNumber + 1);
  }, [pageNumber, fetchPage]);
  
  React.useEffect(() => {
    if (newPage !== null) {
      setNewPage(null);
      setPages([...pages, newPage]);
    }
  }, [newPage, setPages, pages]);

  React.useEffect(() => {
    setResults(flatMapResponseArrToItemArr(pages));
  }, [pages, setResults, flatMapResponseArrToItemArr])

  return [results, isFetching, isError, initialFetch, fetchNextPage, clearData] as const;
}

export { usePaginatedData };
