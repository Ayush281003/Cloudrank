import React from "react";

import { Pie, PieChart } from "recharts";

import type { ChartConfig } from "./ui/chart";

import { ACCOUNTS, PAGE_SIZE } from "~/config/constants";
import { useAppState } from "~/hooks/use-app-state";
import { slugify, unSlugify } from "~/lib/utils";

import { Button } from "./ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import If from "./ui/if";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const chartConfig = {
  "face-to-face": {
    label: "Face to Face",
    color: "#1976d2",
  },
  inperson: {
    label: "InPerson",
    color: "#64b5ef",
  },
  email: {
    label: "Email",
    color: "#90caf9",
  },
  phone: {
    label: "Phone",
    color: "#64b5f6",
  },
  other: {
    label: "Other",
    color: "#2196f3",
  },
} satisfies ChartConfig;

export function UserAnalytics() {
  const { user, callsInUserTerritory } = useAppState();

  const [callType, setCallType] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);

  const chartData = callsInUserTerritory.reduce(
    (acc, call) => {
      const callType = slugify(call.callType);

      const existingData = acc.find(
        (data) => slugify(data.callType) === callType
      );

      if (existingData) {
        existingData.value += 1;
      } else {
        acc.push({ callType, value: 1, fill: `var(--color-${callType})` });
      }

      return acc;
    },
    [] as { callType: string; value: number; fill: string }[]
  );

  const filteredCalls = callsInUserTerritory.filter(
    (call) => !callType || slugify(call.callType) === callType
  );

  const paginatedFilteredCalls = filteredCalls.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <If
      condition={user}
      fallback={
        <div className="my-4 bg-blue-100 p-6 text-center text-lg font-bold text-blue-900 shadow-md">
          Please select a user to view analytics
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4 *:rounded-md *:bg-blue-100 *:shadow-md">
        <div className="flex h-full items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="aspect-square h-full max-h-[640px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="callType"
                onClick={(data) => setCallType(data.name)}
                label={({ tooltipPayload, value }) =>
                  `${unSlugify(tooltipPayload[0].name)} (${value})`
                }
                className="cursor-pointer"
              />

              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend
                content={<ChartLegendContent nameKey="callType" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </div>

        <div className="space-y-4 p-4">
          <p className="text-center text-lg font-bold text-blue-700">
            Other Details
          </p>

          <Table className="overflow-hidden rounded-md bg-background">
            <TableHeader>
              <TableRow className="bg-blue-200 *:text-center *:font-bold *:text-blue-800">
                <TableHead>Call ID</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Call Date</TableHead>
                <TableHead>Call Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedFilteredCalls.map(
                ({ id, accountId, callDate, callStatus }) => (
                  <TableRow key={id} className="*:p-3 *:text-center">
                    <TableCell>{id}</TableCell>
                    <TableCell>
                      {ACCOUNTS.find(({ id }) => id === accountId)?.name ||
                        "Unknown"}
                    </TableCell>
                    <TableCell>
                      {new Date(callDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{callStatus}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <div className="mt-auto flex items-center justify-between *:w-40">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Previous
            </Button>
            <p className="text-center text-blue-500">
              {page} / {Math.ceil(filteredCalls.length / PAGE_SIZE)}
            </p>
            <Button
              disabled={page * PAGE_SIZE >= filteredCalls.length}
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </If>
  );
}
