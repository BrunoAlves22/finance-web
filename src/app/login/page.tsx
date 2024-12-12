import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Login() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[500px] flex-col justify-center gap-2 p-8">
        <Image
          src="/logo.svg"
          alt="Logo da aplicação - Finance"
          width={173}
          height={39}
          className="select-none"
        />

        <h1 className="mt-2 text-4xl font-bold text-white">Bem Vindo</h1>
        <p className="text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <SignInButton>
          <Button className="mt-4 bg-zinc-800 transition-colors hover:bg-zinc-800/70">
            <LogInIcon className="mr-2 h-8 w-8" />
            <span className="text-sm font-light">
              Fazer login ou Criar conta.
            </span>
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Imagem da página de Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
