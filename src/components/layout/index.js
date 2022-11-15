import {AppProvider} from '../../context';
import Header from './header';
import Footer from './footer';

/**
 * Layout component.
 *
 * @param headerFooterData
 * @param children
 * @returns {*}
 * @constructor
 */
const Layout = ({headerFooterData, children}) => {
  const {header, footer} = headerFooterData || {};

  return (
    <AppProvider>
      <>
        <Header data={header}/>
        <main className="container mx-auto px-1 py-4 overflow-hidden">
          {children}
        </main>
        <Footer data={footer}/>
      </>
    </AppProvider>
  );
};

export default Layout;
