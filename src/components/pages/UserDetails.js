import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Segment,
  Label,
  Image,
  Header,
  List,
  Loader
} from "semantic-ui-react";

function UserDetails(props) {
  const [state, setState] = useState({
    profile: {},
    repository: [],
    loading: true
  });

  useEffect(() => {
    const getUser = async (uid = props.match.params.uid) => {
      const client_id = process.env.REACT_APP_CLIENT_ID;
      const client_secret = process.env.REACT_APP_CLIENT_SECRET;
      setState({ ...state, loading: true });
      const profileResponse = await fetch(
        `https://api.github.com/users/${uid}?client_id=${client_id}&client_secret=${client_secret}`
      );

      const repoResponse = await fetch(
        `https://api.github.com/users/${uid}/repos?per_page=5&sort=asc&client_id=${client_id}&client_secret=${client_secret}`
      );
      const profile = await profileResponse.json();
      const repos = await repoResponse.json();

      setState({ profile: profile, repository: repos, loading: false });
    };
    getUser();

    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Button as={Link} to="/" content="Back To Search" icon="arrow left" />

      <Segment.Group horizontal raised>
        <Segment
          textAlign="center"
          style={{ width: "40%" }}
          loading={state.loading}
        >
          <Image src={state.profile.avatar_url} size="tiny" circular centered />
          <Header content={state.profile.name} size="medium" />
          <Header
            content={`Location: ${state.profile.location}`}
            size="small"
            style={{ marginTop: "0px" }}
          />
          {!!state.profile.hireable ? (
            <Label>
              <Icon name="checkmark" color="green" />
              Hireable
            </Label>
          ) : (
            <Label>
              <Icon name="close" color="red" /> Not Hireable
            </Label>
          )}
        </Segment>
        <Segment style={{ width: "60%" }} loading={state.loading}>
          <Header content="Bio" />

          <p>{state.profile.bio}</p>

          <Button
            as="a"
            href={state.profile.html_url}
            target="_blank"
            content="Visit Github Profile"
            color="black"
            size="mini"
          />

          <List>
            <List.Item>Username: {state.profile.login}</List.Item>
            <List.Item>Company: {state.profile.company}</List.Item>
            <List.Item>Website: {state.profile.blog}</List.Item>
          </List>
        </Segment>
      </Segment.Group>
      <Segment textAlign="center">
        <Label color="red">
          <Icon name="users" />
          Followers: {state.profile.followers}
        </Label>
        <Label color="green">
          <Icon name="user plus" />
          Following: {state.profile.following}
        </Label>
        <Label color="grey">
          <Icon name="github" />
          Public Repos: {state.profile.public_repos}
        </Label>
        <Label color="black">
          <Icon name="github alternate" />
          Public Gists: {state.profile.public_gists}
        </Label>
      </Segment>
      <Segment.Group>
        <Loader active={state.loading} />
        {state.repository &&
          state.repository.map((repo, i) => (
            <Segment as="h2" key={i}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </Segment>
          ))}
      </Segment.Group>
    </React.Fragment>
  );
}
export default UserDetails;
