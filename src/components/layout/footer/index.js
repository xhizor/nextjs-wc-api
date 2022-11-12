import Link from 'next/link';

import MenuItem from '../../../models/MenuItem';
import {getIconComponentByName} from '../../../utils/icons-mapper';
import {sanitize} from '../../../utils/functions';

/**
 * Footer component.
 *
 * @returns {*}
 * @constructor
 */
const Footer = ({data}) => {
  const {footerMenuItems, copyrightText, socialLinks} = data || {};
  const menuItems = footerMenuItems?.length
    ? footerMenuItems.map(footerMenuItem => new MenuItem(footerMenuItem))
    : null;

  return (
    <footer className="bg-teal-500 p-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-1 overflow-hidden text-white">
          <div
            className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3v">
            {
              menuItems &&
              <ul>
                {
                  menuItems.map(({id, link, title}) => (
                    <li key={id}>
                      <Link href={link}
                            dangerouslySetInnerHTML={{__html: sanitize(title)}}/>
                    </li>
                  ))
                }
              </ul>
            }
          </div>
        </div>
        <div className="mb-8 mt-8 w-full flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/4 text-white">
            {copyrightText ? copyrightText : '©'}
          </div>
          <div className="w-full lg:w-3/4 flex justify-end">
            <ul className="flex item-center">
              {
                socialLinks?.length && socialLinks.map(socialLink => (
                  <li key={socialLink?.iconName} className="ml-4">
                    <a href={socialLink?.iconUrl ?? '/'} target="_blank"
                       rel="noreferrer"
                       title={socialLink?.iconName}>
                      {getIconComponentByName(socialLink?.iconName)}
                      <span className="sr-only">{socialLink?.iconName}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
