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
} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
const emailAutorizados = ["coutinhocoutinholucas@gmail.com"];
export default function Nav() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
          <div
                      className="bg-orange-600 rounded-full p-1"
                    >
                      <button
                        type="button"
                        onClick={onOpen}
                      >
                        <div className="px-2">Sign In</div>
                      </button>
                    </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-orange-900"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
