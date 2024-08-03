import { USERS } from "~/config/constants";
import { useAppState } from "~/hooks/use-app-state";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Navbar() {
  const { setUser } = useAppState();

  function handleUserChange(userId: string) {
    setUser(USERS.find((u) => u.userId === userId)!);
  }

  return (
    <header className="static top-0 flex h-20 items-center justify-center bg-blue-700 text-primary-foreground shadow-md">
      <nav>
        <Select onValueChange={handleUserChange}>
          <Label className="flex flex-col gap-2">
            <span className="font-semibold">Select User</span>

            <SelectTrigger className="min-w-60 text-foreground">
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
          </Label>

          <SelectContent className="min-w-60 *:cursor-pointer">
            <SelectGroup>
              <SelectLabel>Select User</SelectLabel>
              {USERS.map(({ userId, userName }) => (
                <SelectItem key={userId} value={userId}>
                  {userName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </nav>
    </header>
  );
}
