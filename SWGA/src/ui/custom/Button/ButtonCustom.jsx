import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `
};

const variations = {
  primary: css`
    color: var(--color-grey-0);
    background-color: var(--color-green-400);

    &:hover {
      background-color: var(--color-green-600);
    }
  `,
  secondary: css`
  color: var(--color-grey-600);
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);

  &:hover {
    background-color: var(--color-grey-50);
  }
`,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  orange: css`
    color: var(--color-grey-0);
    background-color: orange;

    &:hover {
      background-color: var(--color-tag-orange-700);
    }
  `,
};

const ButtonCustom = styled.button`
  border-radius: 7px;
  box-shadow: var(--shadow-sm);
  border: none;

  ${(props) => sizes[props.$sizes]}
  ${(props) => variations[props.$variations]}
`;

ButtonCustom.defaultProps = {
  $variations: "primary",
  $sizes: "medium",
};
export default ButtonCustom;
