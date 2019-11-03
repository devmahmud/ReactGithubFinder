import React from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Button } from "semantic-ui-react";

export default function UserListItem({ user }) {
  return (
    <Segment textAlign="center">
      <Image src={user.avatar_url} size="tiny" circular centered />
      <h4>{user.login}</h4>
      <Button secondary content="More" as={Link} to={`/${user.login}`} />
    </Segment>
  );
}
