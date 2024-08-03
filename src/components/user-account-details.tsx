import React from "react";

import { PAGE_SIZE } from "~/config/constants";
import { useAppState } from "~/hooks/use-app-state";

import { Button } from "./ui/button";
import If from "./ui/if";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function UserAccountDetails() {
  const {
    user,
    accountsInUserTerritory,
    callsInUserTerritory,
    emailsInUserTerritory,
  } = useAppState();

  const [page, setPage] = React.useState(1);

  const filteredAccounts = accountsInUserTerritory.filter(
    ({ territory }) => territory === user?.territory
  );

  const paginatedFilteredAccounts = filteredAccounts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const getAccountDetails = (accountId: string) => {
    const accountCalls = callsInUserTerritory.filter(
      (call) => call.accountId === accountId
    );
    const accountEmails = emailsInUserTerritory.filter(
      (email) => email.accountId === accountId
    );

    const totalCalls = accountCalls.length;
    const totalEmails = accountEmails.length;

    const latestCallDate = accountCalls.reduce(
      (latest, call) => (call.callDate > latest ? call.callDate : latest),
      ""
    );

    const latestEmailDate = accountEmails.reduce(
      (latest, email) => (email.emailDate > latest ? email.emailDate : latest),
      ""
    );

    return {
      totalCalls,
      totalEmails,
      latestEmailDate: new Date(latestEmailDate).toLocaleDateString(),
      latestCallDate: new Date(latestCallDate).toLocaleDateString(),
    };
  };

  return (
    <If
      condition={user}
      fallback={
        <div className="my-4 bg-blue-100 p-6 text-center text-lg font-bold text-blue-900 shadow-md">
          Please select a user to view account details
        </div>
      }
    >
      <div className="my-4 flex w-full flex-col items-center gap-4 rounded-md bg-blue-100 p-4">
        <p className="text-center text-lg font-bold text-blue-700">
          {user?.userName}'s Territory Account Details
        </p>

        <Table className="overflow-hidden rounded-md bg-background">
          <TableHeader>
            <TableRow className="bg-blue-200 *:text-center *:font-bold *:text-blue-800">
              <TableHead>Account Name</TableHead>
              <TableHead>Total Calls</TableHead>
              <TableHead>Total Emails</TableHead>
              <TableHead>Latest Call Date</TableHead>
              <TableHead>Latest Email Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedFilteredAccounts.map(({ id, name }) => {
              const {
                totalCalls,
                totalEmails,
                latestCallDate,
                latestEmailDate,
              } = getAccountDetails(id);

              return (
                <TableRow key={id} className="*:p-3 *:text-center">
                  <TableCell>{name}</TableCell>
                  <TableCell>{totalCalls}</TableCell>
                  <TableCell>{totalEmails}</TableCell>
                  <TableCell>{latestCallDate}</TableCell>
                  <TableCell>{latestEmailDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex w-full items-center justify-between *:w-40">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Previous
          </Button>
          <p className="text-center text-blue-500">
            {page} / {Math.ceil(filteredAccounts.length / PAGE_SIZE)}
          </p>
          <Button
            disabled={page * PAGE_SIZE >= filteredAccounts.length}
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Next
          </Button>
        </div>
      </div>
    </If>
  );
}
