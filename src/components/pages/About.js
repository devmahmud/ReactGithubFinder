import React from "react";
import { Segment, Header } from "semantic-ui-react";

function About() {
  return (
    <Segment>
      <Header as="h4" content="Github Finder React App" />
      <p>Version: 1.0.0</p>
      <p>Developed By: Mahmudul Alam</p>
      <p>Inspired From: Brad Traversy</p>
    </Segment>
  );
}
export default About;
