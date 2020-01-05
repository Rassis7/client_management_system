import React from "react";
import { useHistory } from "react-router-dom";

import { StyledButton } from "../styles/state";
// import history from "../service/history";

export default function New() {
  const history = useHistory();

  const handleClick = () => history.push("/new");

  return (
    <StyledButton size="small" color="#19ad25" onClick={handleClick}>
      <span>Novo cliente</span>
    </StyledButton>
  );
}
