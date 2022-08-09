import { Button, Navbar } from 'flowbite-react';
import { useSession } from 'next-auth/react';

export default function RetroPilotHeader(): JSX.Element {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-20">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
            RetroPilot
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {status === 'authenticated' && (
            <Button href="/api/auth/signout">
              Sign out
            </Button>
          ) || (
            <Button href="/api/auth/signin">
              Sign in
            </Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">
            Store
          </Navbar.Link>
          <Navbar.Link href="#">
            Wiki
          </Navbar.Link>
          <Navbar.Link href="#">
            Leaderboard
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
