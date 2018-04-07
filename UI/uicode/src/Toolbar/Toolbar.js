import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Menu } from 'semantic-ui-react';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "search"
    };
  };

  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name});
    this.toggleComponents(name);
  };

  selectActiveItem = (name) => {
    this.setState({activeItem: name});
    this.toggleComponents(name);
  };

  toggleComponents = (component) => {
    if(component === "search") {
      this.props.toggleVisibleSearch(true);
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleUploadBookmark(false);
      this.props.toggleVisibleManageBookmark(false);
    } else if(component === "addLink") {
      this.props.toggleVisibleSearch(false);
      this.props.toggleVisibleAddLink(true);
      this.props.toggleVisibleManageBookmark(false);
      this.props.toggleVisibleUploadBookmark(false);
    } else if(component === "uploadBookmark") {
      this.props.toggleVisibleSearch(false);
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleUploadBookmark(true);
      this.props.toggleVisibleManageBookmark(false);
    } else if(component === "manageBookmark") {
      this.props.toggleVisibleSearch(false);
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleUploadBookmark(false);
      this.props.toggleVisibleManageBookmark(true);
    }
  };

  render() {
    const {activeItem} = this.state;
    return (
      <div className="px2 pt1 pb2">
        <Menu>
            <Menu.Item
                name='search'
                active={activeItem === 'search'}
                onClick={this.handleItemClick}
            />
            <Menu.Item
                name='addLink'
                active={activeItem === 'addLink'}
                onClick={this.handleItemClick}>
            </Menu.Item>
            <Menu.Item
                name='uploadBookmark'
                active={activeItem === 'uploadBookmark'}
                onClick={this.handleItemClick}
            />
            <Menu.Item
                name='manageBookmark'
                active={activeItem === 'manageBookmark'}
                onClick={this.handleItemClick}
            />
        </Menu>
      </div>
    )
  }
}

Toolbar.propTypes = {
  visibleAddLink: PropTypes.bool,
  visibleUploadBookmark: PropTypes.bool,
  visibleManageBookmark: PropTypes.bool,
  visibleSearch: PropTypes.bool,
  toggleVisibleAddLink: PropTypes.func,
  toggleVisibleUploadBookmark: PropTypes.func,
  toggleVisibleManageBookmark: PropTypes.func,
  toggleVisibleSearch: PropTypes.func,
};
