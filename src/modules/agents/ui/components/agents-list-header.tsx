"use client";

import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "./new-agent-dialog";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button
              variant={"outline"}
              onClick={onClearFilters}
              className="size-9"
            >
              <XIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
