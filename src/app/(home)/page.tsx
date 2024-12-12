import { isMatch } from "date-fns";
import { TimeSelect } from "./_components/time-select";
import { redirect } from "next/navigation";
import { DashboardComponents } from "./_components/dashboard-components";
import { auth } from "@clerk/nextjs/server";
import { ToggleTheme } from "./_components/toggle-theme";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  return (
    <div className="flex flex-col overflow-hidden p-3">
      <div className="mb-4 flex justify-end">
        <div className="flex items-center gap-3">
          <ToggleTheme />
          <TimeSelect />
        </div>
      </div>

      <DashboardComponents searchParams={{ month }} />
    </div>
  );
}
