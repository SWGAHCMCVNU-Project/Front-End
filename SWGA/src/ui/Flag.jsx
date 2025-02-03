import styled from "styled-components";
import logoDefault from "../assets/images/logo-slack.svg";

export const Flag = styled.img`
  width: ${(props) => (props.src ? "40rem" : "40rem")};
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};

  // If image is empty or null, use logoDefault
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;
