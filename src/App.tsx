import { Navbar } from "./components/site-header/navbar";
import { UserAccountDetails } from "./components/user-account-details";
import { UserAnalytics } from "./components/user-analytics";

export default function App() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <UserAnalytics />
      <UserAccountDetails />
    </div>
  );
}
