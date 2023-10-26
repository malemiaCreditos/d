"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
const emailAutorizados = ["coutinhocoutinholucas@gmail.com"];
export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  function sair() {
    signOut;
    router.push("/");
  }
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Image
            src="/imagens/malamiaG.png"
            alt="Plataforma Logo"
            // className="dark:invert"
            width={70}
            height={70}
            className="mt-4"
            priority
          />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {session?.user ? (
            <>
              {session?.user.email === "coutinhocoutinholucas@gmail.com" ? (
                <>
                  <NavbarItem>
                    <Link color="foreground" href="/emprestimos">
                      Empréstimos
                    </Link>
                  </NavbarItem>
                  <NavbarItem isActive>
                    <Link href="/lancamentos" aria-current="page">
                      Lançamentos
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link color="foreground" href="/entradaSaida">
                      Entradas/Saídas
                    </Link>
                  </NavbarItem>
                </>
              ) : (
                <>
                  <NavbarItem>
                    <Link color="foreground" href="/solicitarEmprestimo">
                      Solicitar Emprestimo
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link color="foreground" href="#">
                      Meus Emprestimos
                    </Link>
                  </NavbarItem>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {session?.user ? (
              <div className="flex gap-3 md:gap-5">
                <div className="bg-black rounded-full p-1">
                  <button
                    type={"button"}
                    onClick={sair}
                    className="outline_btn"
                  >
                    <div className="px-2">Sign Out</div>
                  </button>
                </div>

                <Link href={"/profile"}>
                  <Image
                    className="rounded-full"
                    alt="Profilo Pic"
                    src={session?.user.image}
                    width={40}
                    height={40}
                  />
                </Link>
              </div>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-orange-600 rounded-full p-1"
                    >
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                      >
                        <div className="px-2">Sign In</div>
                      </button>
                    </div>
                  ))}
              </>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
