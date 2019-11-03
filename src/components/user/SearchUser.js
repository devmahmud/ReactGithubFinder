import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function SearchUser(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const handleChange = e => {
    setQuery(e.target.value);
    error && setError(false);
  };

  const handleClear = e => {
    e.preventDefault();
    props.onClear();
    setQuery("");
  };

  const handleSubmit = () => {
    if (query === "") {
      setError(true);
    } else {
      props.onSearch(query);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          error={
            error && {
              content: "Please enter username to search",
              pointing: "below"
            }
          }
          type="text"
          icon="search"
          placeholder="Search User..."
          value={query}
          onChange={handleChange}
        />
        <Form.Button fluid content="Search" color="black" type="submit" />
        {props.showClear && (
          <Form.Button
            fluid
            content="Clear"
            onClick={handleClear}
            type="button"
          />
        )}
      </Form>
    </div>
  );
}
export default SearchUser;
