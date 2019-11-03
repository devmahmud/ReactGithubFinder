import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Icon, Container } from "semantic-ui-react";

function Navbar() {
  return (
    <Menu borderless inverted fixed="top" color="violet">
      <Container>
        <Menu.Item as={Link} to="/" className="brand">
          <Menu.Header as="h3">
            <Icon name="github" />
            GithubFinder
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/" position="right">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/about">
          <Icon name="info" />
          About
        </Menu.Item>
      </Container>
    </Menu>
  );
}
export default Navbar;
