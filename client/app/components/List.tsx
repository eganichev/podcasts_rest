"use client";
import { IPodcast, TParamsToChange } from "@/common/types";
import ListItem from "@/app/components/ListItem";
import Search from "@/app/components/Search";
import NoData from "@/app/components/NoData";
import Pagination from "@/app/components/Pagination";
import { useState, useRef } from "react";
import { getPodcasts } from "@/services/products";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/components/Loader";

interface IProps {
  podcasts: IPodcast[];
}

export default function List({ podcasts = [] }: IProps) {
  const [loading, setLoading] = useState(false);
  const searchQuery = useRef<Record<string, string> | undefined>({});
  const { toast } = useToast();

  const [podcastsData, setPodcastsData] = useState<IPodcast[]>(podcasts || []);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const loadData = async (searchParams: string) => {
    try {
      setLoading(true);
      const data = await getPodcasts(searchParams);
      setPodcastsData(data);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error while loading podcasts",
        description: (e as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = async (params: TParamsToChange) => {
    const shouldResetPage =
      Object.keys(searchQuery.current || {})[0] !== Object.keys(params)[0];
    searchQuery.current = { ...params };
    await loadData(
      new URLSearchParams({
        page: String(shouldResetPage ? 1 : page),
        limit: String(pageSize),
        ...params,
      }).toString(),
    );
    shouldResetPage && setPage(1);
  };

  const onPageChange = async (
    params: TParamsToChange,
    shouldResetPage?: boolean,
  ) => {
    await loadData(
      new URLSearchParams({
        ...params,
        page: shouldResetPage ? String(1) : params.page,
        ...searchQuery.current,
      }).toString(),
    );
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
          setPage={async (page) => {
            setPage(page);
            await onPageChange({ page: String(page), limit: String(pageSize) });
          }}
          setPageSize={async (value) => {
            setPageSize(value);
            await onPageChange(
              { page: String(page), limit: String(value) },
              true,
            );
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
        setPage={async (page) => {
          setPage(page);
          await onPageChange({ page: String(page), limit: String(pageSize) });
        }}
        setPageSize={async (value) => {
          setPageSize(value);
          await onPageChange(
            { page: String(page), limit: String(value) },
            true,
          );
        }}
      />
    </main>
  );
}
