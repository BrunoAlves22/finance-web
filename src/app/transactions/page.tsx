import TransactionsComponent from "@/components/Transactions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Transactions() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  return <TransactionsComponent />;
}
