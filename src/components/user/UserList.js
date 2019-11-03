import React from "react";
import { Grid } from "semantic-ui-react";
import UserListItem from "./UserListItem";

export default function UserList({ users }) {
  return (
    <Grid columns="3" style={{ marginTop: "1em" }}>
      {users &&
        users.map((item, i) => {
          return (
            <Grid.Column key={i}>
              <UserListItem user={item} />
            </Grid.Column>
          );
        })}
    </Grid>
  );
}
