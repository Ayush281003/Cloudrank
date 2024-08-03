import React from "react";

import type { User } from "~/config/constants";

import { ACCOUNTS, CALLS, EMAILS } from "~/config/constants";
import { AppStateContext } from "~/hooks/use-app-state";

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const accountsInUserTerritory = React.useMemo(() => {
    if (!user) {
      return [];
    }

    return ACCOUNTS.filter((account) => account.territory === user.territory);
  }, [user]);

  const callsInUserTerritory = CALLS.filter((call) =>
    accountsInUserTerritory.some((account) => account.id === call.accountId)
  );

  const emailsInUserTerritory = EMAILS.filter((email) =>
    accountsInUserTerritory.some((account) => account.id === email.accountId)
  );

  return (
    <AppStateContext.Provider
      value={{
        user,
        setUser,
        accountsInUserTerritory,
        callsInUserTerritory,
        emailsInUserTerritory,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
