import Img from 'next/image';

import PropTypes from 'prop-types';

/**
 * Image component
 *
 * @param props
 * @returns {null|*}
 * @constructor
 */
const Image = (props) => {
  const {altText, title, width, height, sourceUrl, className, layout, objectFit, containerClassNames, ...rest} = props;

  if (!sourceUrl) {
    return null;
  }

  const attributes = {
    alt: altText || title,
    src: sourceUrl,
    width,
    height,
    className,
    ...rest
  };
  return <Img {...attributes} />;
};

Image.propTypes = {
  altText: PropTypes.string,
  title: PropTypes.string,
  sourceUrl: PropTypes.string,
  layout: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string
};

Image.defaultProps = {
  altText: '',
  title: '',
  sourceUrl: '',
  containerClassNames: '',
  className: 'product__image',
};

export default Image;