class MenuItem {
  /**
   *
   * @param menuItem
   */
  constructor(menuItem) {
    this.id = menuItem?.ID;
    this.title = menuItem?.title;
    this.link = menuItem?.url ?? '/';
  }
}

export default MenuItem;
