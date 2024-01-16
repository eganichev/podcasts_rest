"use client";
import { IPodcast, TParamsToChange } from "@/common/types";
import ListItem from "@/app/components/ListItem";
import Search from "@/app/components/Search";
import NoData from "@/app/components/NoData";
import Pagination from "@/app/components/Pagination";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/components/Loader";
import { GET_PODCASTS } from "@/app/graph/queries";
import { useQuery } from "@apollo/client";

export default function List() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    loading,
    data: { podcasts: podcastsData } = { podcasts: [] },
    error,
    refetch,
  } = useQuery<{ podcasts: IPodcast[] }>(GET_PODCASTS, {
    variables: { query: { page: 1, limit: 5 } },
  });

  const searchQuery = useRef<Record<string, string> | undefined>({});
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        title: "Error while loading podcasts",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }, [error]);

  const onSearchChange = (params: TParamsToChange) => {
    const shouldResetPage =
      Object.keys(searchQuery.current || {})[0] !== Object.keys(params)[0];

    searchQuery.current = { ...params };
    refetch({ query: { page, limit: pageSize, ...params } });
    shouldResetPage && setPage(1);
  };

  const onPageChange = (
    params: { [key: string]: number },
    shouldResetPage?: boolean,
  ) => {
    refetch({
      query: {
        ...params,
        page: shouldResetPage ? 1 : params.page,
        ...searchQuery.current,
      },
    });
    if (shouldResetPage) {
      setPage(1);
    }
  };

  return (
    <main className="relative">
      {loading && <Loader />}
      <Search onSearchChange={onSearchChange} />
      {!!podcastsData.length && (
        <Pagination
          page={page}
          pageSize={pageSize}
          setPage={(page) => {
            setPage(page);
            onPageChange({ page, limit: pageSize });
          }}
          setPageSize={(value) => {
            setPageSize(value);
            onPageChange({ page, limit: value }, true);
          }}
        />
      )}
      <div className="grid grid-flex-col grid-cols-1 lg:grid-cols-2 p-4 gap-x-4">
        {!!podcastsData.length &&
          podcastsData.map((podcast) => (
            <ListItem podcast={podcast} key={podcast.id} />
          ))}
      </div>
      {!podcastsData.length && <NoData />}
      <Pagination
        page={page}
        pageSize={pageSize}
        setPage={(page) => {
          setPage(page);
          onPageChange({ page, limit: pageSize });
        }}
        setPageSize={(value) => {
          setPageSize(value);
          onPageChange({ page, limit: value }, true);
        }}
      />
    </main>
  );
}
