import {useContext, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';

import MenuItem from '../../../models/MenuItem';
import {HamburgerIcon, Wishlist} from '../../icons';
import User from '../../icons/User';
import Bag from '../../icons/Bag';
import {sanitize} from '../../../utils/functions';
import Image from '../../image';
import {AppContext} from '../../../context';

/**
 * Header component.
 *
 * @returns {*}
 * @constructor
 */
const Header = ({data}) => {
  const [cart, setCart] = useContext(AppContext);
  const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon} = data || {};
  const menuItems = headerMenuItems?.length
    ? headerMenuItems.map(headerMenuItem => new MenuItem(headerMenuItem))
    : null;

  const [isMenuVisible, setMenuVisibility] = useState(false);
  const toggleMenuVisibility = () => {
    setMenuVisibility(isMenuVisible => !isMenuVisible);
  };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href={favicon || '/favicon.ico'}/>
      </Head>
      <div className="header">
        <nav className="bg-white p-4">
          <div
            className="container mx-auto flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 text-black mr-20">
              <Link href="/">
                <Image sourceUrl={siteLogoUrl} altText={`${siteTitle} logo`}
                       className="mr-2"
                       width={70} height={70}/>
              </Link>
              <span>
                <Link href="/" className="font-semibold text-xl tracking-tight">
                  {siteTitle}
                </Link>
                {siteDescription && <p>{siteDescription}</p>}
              </span>
            </div>
            <div className="block lg:hidden pt-4">
              <button
                className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black"
                onClick={toggleMenuVisibility}
              >
                <HamburgerIcon className="fill-current h-3 w-3"/>
              </button>
            </div>
            <div
              className={`${isMenuVisible ? 'max-h-full' : 'h-0'} w-full overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto`}>
              <div
                className="text-sm lg:text-center font-medium uppercase lg:flex-grow">
                {
                  menuItems && menuItems.map(({id, link, title}) => (
                    <Link key={id}
                          href={link}
                          className='block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10'
                          dangerouslySetInnerHTML={{__html: sanitize(title)}}/>
                  ))
                }
              </div>
              <div className="text-sm font-medium">
                <a href="#"
                   className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
                    <User className="mr-1 lg:mr-0"/>
									  Profile
									</span>
                </a>
                <a href="#"
                   className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
                    <Wishlist className="mr-1 lg:mr-0"/>
										Wishlist
									</span>
                </a>
                <Link href="/cart"
                      className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
              		<span className="flex flex-row items-center lg:flex-col">
                    <Bag className="mr-1 lg:mr-0"/>
                    <span className="ml-1">
                      Bag{cart?.totalQuantity
                      ? <span> ({cart?.totalQuantity})</span>
                      : null}
                    </span>
									</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
};

export default Header;