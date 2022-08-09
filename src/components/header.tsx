import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type NextAuthUser = NonNullable<DefaultSession['user']>;

type UserDropdownProps = {
  user: NextAuthUser,
};

function UserDropdown(props: UserDropdownProps): JSX.Element {
  const { user } = props;
  const router = useRouter();

  const avatar = (
    <Avatar
      alt="User settings"
      img={user.image ?? undefined}
      rounded={true}
    >
      <div className="space-y-1 font-medium dark:text-white">
        <div>
          {user.name}
        </div>
      </div>
    </Avatar>
  );

  return (
    <Dropdown
      label={avatar}
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {user.name}
        </span>
        <span className="block truncate text-sm font-medium">
          {user.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item onClick={() => router.push('/dashboard')}>
        Dashboard
      </Dropdown.Item>
      <Dropdown.Item onClick={() => router.push('/settings')}>
        Settings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => router.push('/api/auth/signout')}>
        <span className='text-red-500'>
          Sign out
        </span>
      </Dropdown.Item>
    </Dropdown>
  );
}

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
          {status === 'authenticated' && session?.user && (
            <UserDropdown user={session.user} />
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
