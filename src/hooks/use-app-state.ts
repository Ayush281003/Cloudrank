import React from "react";

import type { Account, Call, Email, User } from "~/config/constants";

type AppState = {
  user: User | null;
  setUser: (user: User) => void;
  accountsInUserTerritory: Account[];
  callsInUserTerritory: Call[];
  emailsInUserTerritory: Email[];
};

export const AppStateContext = React.createContext<AppState | null>(null);

export function useAppState() {
  const context = React.useContext(AppStateContext);

  if (!context) {
    throw new Error("`useAppState` must be used within `AppStateProvider`");
  }

  return context;
}
