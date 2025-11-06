// //  /app/(routes)/dashboard/layout.tsx

'use client'

import { ReactNode, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMenu, IoClose } from 'react-icons/io5'
import { FaExchangeAlt, FaTelegram } from 'react-icons/fa'
import { MdOutlineBarChart } from 'react-icons/md'
import { RiSettingsLine } from 'react-icons/ri'
import { FaRegUserCircle } from 'react-icons/fa'
import { Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Logo from '@/public/images/logo.png'
import { mockUser } from '@/app/data/user' // import user mock data
import { SlEarphones } from 'react-icons/sl'
import { FaXTwitter } from 'react-icons/fa6'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [opened, { open, close, toggle }] = useDisclosure(false)

  // State to manage user authentication status and dropdown visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<typeof mockUser | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleConnectWallet = () => {
    setUser(mockUser)
    setIsAuthenticated(true)
  }

  const handleDisconnect = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev) // Toggle dropdown visibility
  }

  const menu = [
    {
      name: 'market',
      href: '/dashboard/market',
      icon: <MdOutlineBarChart size={24} />,
    },
    {
      name: 'dust converter',
      href: '/dashboard/dust-converter',
      icon: <FaExchangeAlt size={24} />,
    },
    {
      name: 'on chain',
      href: '/dashboard/on-chain',
      icon: <RiSettingsLine size={24} />,
    },
  ]

  const sidebarContent = (
    <div className="flex flex-col space-y-8 py-12 px-4">
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-md transition-colors capitalize ${
            pathname === item.href
              ? 'bg-button-bg/40 font-bold'
              : 'hover:bg-button-bg/20 '
          }`}
          onClick={close} // close drawer when link clicked
        >
          {item.icon}
          {item.name}
        </Link>
      ))}

      <div className="mt-20">
        <div className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-md transition-colors capitalize hover:bg-button-bg/20 cursor-pointer mt-8">
          <SlEarphones size={16} /> <span>Support</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <FaXTwitter size={16} />
          <FaTelegram size={16} />
          <FaTelegram size={16} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <button
            className="text-xs md:text-sm cursor-pointer bg-button-bg px-4 py-2 rounded-md text-white font-semibold"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="relative px-4 py-2">
            <FaRegUserCircle
              size={38}
              className="cursor-pointer text-button-bg"
              onClick={toggleDropdown} // Toggle dropdown on avatar click
            />
            {/* {isDropdownOpen && (
              <div className="absolute right-0 top-[40px] mt-2 bg-black rounded-lg shadow-lg text-xs w-32 space-y-2.5">
                <p className="px-4 py-2 text-white">
                  {user?.wallet
                    ? `Wallet: ${user.wallet}`
                    : 'No wallet connected'}
                </p>
                <button
                  className="w-full px-4 py-2 text-white bg-red-600 rounded-b-lg cursor-pointer"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </button>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="w-full h-screen bg-background flex flex-col relative overflow-x-hidden">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 z-40 w-full flex items-center justify-between">
        {/* Mobile menu icon */}
        <div className="py-2 border-r border-gray-300 px-4 w-58">
          <div className="flex bg-[#F3E4D4] items-center w-full gap-2 py-1 pl-3 ">
            <div className="flex items-center md:hidden">
              <button className="cursor-pointer" onClick={toggle}>
                {opened ? (
                  <IoClose size={38} className="text-white" />
                ) : (
                  <IoMenu size={38} className="text-white" />
                )}
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center ">
              <Image
                src={Logo}
                alt="Baby Crepe Logo"
                width={50}
                height={50}
                className=""
                priority
              />
            </Link>
            <span className="text-[12px] font-bold font-poppins uppercase">
              Baby Crepe
            </span>
          </div>
        </div>

        <div className="md:flex-1 flex justify-between px-4 md:p-6">
          {/* Title expands */}
          {/* Active menu display */}
          <div className="flex items-center gap-2 text-sm md:text-xl font-semibold capitalize text-button-bg">
            {menu.find((item) => item.href === pathname)?.icon}
            <span>
              {menu.find((item) => item.href === pathname)?.name || 'Dashboard'}
            </span>
          </div>

          {/* Wallet Button or User Avatar */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="relative">
                <FaRegUserCircle
                  size={38}
                  className="cursor-pointer text-button-bg"
                  onClick={toggleDropdown} // Toggle dropdown on avatar click
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[40px] mt-2 bg-black rounded-lg shadow-lg text-xs w-32 space-y-2.5">
                    <p className="px-4 py-2 text-white">
                      {user?.wallet
                        ? `Wallet: ${user.wallet}`
                        : 'No wallet connected'}
                    </p>
                    <button
                      className="w-full px-4 py-2 text-white bg-red-600 rounded-b-lg cursor-pointer"
                      onClick={handleDisconnect}
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="md:flex md:flex-1 mt-20 min-h-[calc(100vh-80px)] relative overflow-x-hidden">
        {/* Drawer for mobile */}
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          withinPortal={false}
          zIndex={1000}
          overlayProps={{ opacity: 0.4, blur: 2 }}
          styles={{
            content: {
              backgroundColor: '#F3ECE3',
              width: '222px',
              height: 'calc(100vh - 70px)',
            },
          }}
          className="md:hidden absolute top-0 left-0 h-full z-50"
        >
          {sidebarContent}
        </Drawer>

        {/* Sidebar (desktop only) */}
        <aside className="hidden md:flex w-58 flex-col border-r border-gray-300 h-full fixed top-20 left-0 z-30">
          {sidebarContent}
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full px-4 md:px-6 py-4 overflow-y-auto ml-0 md:ml-58">
          {children}
        </main>
      </div>
    </div>
  )
}
