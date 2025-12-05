"use client";

import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { columns } from "../components/columns";
import { DataTable } from "@/components/custom/data-table";
import { ErrorState } from "@/components/custom/error-state";
import { EmptyState } from "@/components/custom/empty-state";
import { LoadingState } from "@/components/custom/loading-state";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/custom/data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilter();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col justify-between gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading meetings..."
      description="This may take a few seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error loading meetings!"
      description="Please try again later"
    />
  );
};
