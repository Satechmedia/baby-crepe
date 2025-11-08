'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoMenu, IoClose } from 'react-icons/io5'
import { FaRegUserCircle } from 'react-icons/fa'
import Logo from '@/public/images/logo.png'
import { User } from '@/app/types/user'

interface NavbarProps {
  opened: boolean
  toggle: () => void
  pathname: string
  menu: { name: string; href: string; icon: React.ReactNode }[]
  isAuthenticated: boolean
  user: User | null
  isDropdownOpen: boolean
  toggleDropdown: () => void
  handleDisconnect: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  opened,
  toggle,
  pathname,
  menu,
  isAuthenticated,
  user,
  isDropdownOpen,
  toggleDropdown,
  handleDisconnect,
}) => {
  return (
    <header className="fixed top-0 left-0 z-40 w-full flex items-center justify-between bg-[#F3E4D4] md:bg-[#F3ECE3]">
      {/* Mobile menu + logo */}
      <div className="py-2 border-r border-gray-300 px-4 w-full md:w-58">
        <div className="flex justify-between items-center w-full md:gap-2 py-1 md:pl-3 ">
          {/* Menu toggle (mobile) */}
          <div className="flex items-center gap-3 md:hidden order-2 md:order-1">
            <div className="flex items-center gap-4">
              {isAuthenticated && (
                <div className="relative">
                  <FaRegUserCircle
                    size={38}
                    className="cursor-pointer text-button-bg"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-10 mt-2 bg-[#F3E4D4] rounded-lg shadow-lg text-xs w-40 space-y-2.5">
                      <div className="px-4 py-2  border-b border-gray-700">
                        <p className="font-semibold capitalize mb-2 flex gap-2 items-center">
                          <FaRegUserCircle /> {user?.username || 'User'}
                        </p>
                        <p className="text-[10px]  mt-1">
                          Status:{' '}
                          <span className="text-green-600">
                            {user?.status === 'active'
                              ? user?.status
                              : 'Inactive'}
                          </span>
                        </p>
                        <p className="text-[10px] mt-1">
                          {user?.tweets || '0'} Tweets •{' '}
                          {user?.followers || '0'} Followers
                        </p>
                      </div>
                      <p className="px-4 py-2 ">
                        ⭐ Points: {user?.points ?? 0}
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
            <button className="cursor-pointer" onClick={toggle}>
              {opened ? <IoClose size={38} /> : <IoMenu size={38} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex gap-2 items-center order-1 md:order-2">
            <Link href="/" className="flex items-center ">
              <Image
                src={Logo}
                alt="Baby Crepe Logo"
                width={50}
                height={50}
                priority
              />
            </Link>
            <span className="text-[12px] font-bold font-poppins uppercase">
              Baby Crepe
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="md:flex-1 hidden md:flex justify-between px-4 md:p-6">
        {/* Active menu name */}
        <div className="flex items-center gap-2 text-sm md:text-xl font-semibold capitalize text-button-bg">
          {menu.find((item) => item.href === pathname)?.icon}
          <span>
            {menu.find((item) => item.href === pathname)?.name || 'Dashboard'}
          </span>
        </div>

        {/* user dropdown */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="relative">
              <FaRegUserCircle
                size={38}
                className="cursor-pointer text-button-bg"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 top-10 mt-2 bg-[#F3E4D4] rounded-lg shadow-lg text-xs w-40 space-y-2.5">
                  <div className="px-4 py-2  border-b border-gray-700">
                    <p className="font-semibold capitalize mb-2 flex gap-2 items-center">
                      <FaRegUserCircle /> {user?.username || 'User'}
                    </p>
                    <p className="text-[10px]  mt-1">
                      Status:{' '}
                      <span className="text-green-600">
                        {user?.status === 'active' ? user?.status : 'Inactive'}
                      </span>
                    </p>
                    <p className="text-[10px] mt-1">
                      {user?.tweets || '0'} Tweets • {user?.followers || '0'}{' '}
                      Followers
                    </p>
                  </div>
                  <p className="px-4 py-2 ">⭐ Points: {user?.points ?? 0}</p>
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
  )
}

export default Navbar
