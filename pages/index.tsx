import type { NextPage } from 'next'
import { Navbar } from 'flowbite-react'

const Home: NextPage = () => {
  return (
    <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RetroPilot
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          active={true}
        >
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
        <Navbar.Link href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="/login">
          Login
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Home
