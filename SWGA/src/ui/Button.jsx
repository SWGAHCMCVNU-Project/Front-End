import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-grey-0);
    background-color: #1c5d78;

    &:hover {
      background-color: #1c5d78;
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
  third: css`
    color: var(--color-error-600);
    background-color: var(--color-error-700);

    &:hover {
      background-color: var(--color-red-700);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,

  approve: css`
    color: var(--color-brand-50);
    background-color: var(--color-blue-700);

    &:hover {
      background-color: var(--color-brand-600);
    }
  `,
  reject: css`
    color: var(--color-orange-100);
    background-color: var(--color-orange-600);

    &:hover {
      background-color: var(--color-orange-700);
    }
  `,
  secondaryBtn: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      color: var(--color-grey-0);
      background-color: var(--color-green-400);
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

const Button = styled.button`
  border-radius: 7px;
  box-shadow: var(--shadow-sm);
  border: none;

  ${(props) => sizes[props.$sizes]}
  ${(props) => variations[props.$variations]}
`;

Button.defaultProps = {
  $variations: "primary",
  $sizes: "medium",
};
export default Button;
