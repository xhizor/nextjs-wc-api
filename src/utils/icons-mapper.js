import * as SvgIconsComponent from '../components/icons';

/**
 * Icons mapper.
 *
 * @param {string} name Icon name.
 *
 * @returns {*}
 */
export const getIconComponentByName = (name) => {
  const ComponentsMap = {
    facebook: SvgIconsComponent.Facebook,
    twitter: SvgIconsComponent.Twitter,
    instagram: SvgIconsComponent.Instagram,
    youtube: SvgIconsComponent.Youtube
  };

  if (!name in ComponentsMap) return null;

  const IconComponent = ComponentsMap[name];
  return <IconComponent/>;
};