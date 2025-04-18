import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-tag-blue-100: #e6f7ff;
  --color-tag-blue-600: #91d5ff;
  --color-tag-blue-700: #096dd9;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #1677ff;
  --color-green-50: #CAF5DC;
  --color-green-100: #dcfce7;
  --color-green-400: #2ECC71;
  --color-green-600: #21b658;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;
  --color-cyan-100: #e6fffb;
  --color-cyan-600: #87e8de;
  --color-cyan-700: #08979c;
  --color-blue-300: #1c5d78;
  --color-error-100: #fff2f0;
  --color-error-600: #ffccc7;
  --color-error-700: #ff4d4f;

  --color-orange-100: #FCF6F6;
  --color-orange-600: #ea5b18;
  --color-orange-700: #d4380d;

  --color-tag-orange-100: #fff7e6;
  --color-tag-orange-600: #ffd591;
  --color-tag-orange-700: #d46b08;

  --color-tag-purple-100: #f9f0ff;
  --color-tag-purple-600: #d3adf7;
  --color-tag-purple-700: #531dab;

  --color-tag-volcano-100: #fff2e8;
  --color-tag-volcano-600: #ffbb96;
  --color-tag-volcano-700: #d4380d;

  --color-red-100: #fff1f0;
  --color-red-600: #ffa39e;
  --color-red-700: #cf1322;
  --color-red-800: #991b1b;

  --color-no-100: #fafafa;
  --color-no-600: #d1d5db;
  --color-no-700: rgba(0, 0, 0, 0.85);

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --box-shadow: 0px 0.8rem 2.4rem rgba(149, 157, 165, 0.2);

  --box-bg: #ffffff;
  --border-color: #4267b2;
  --input-bg: #f5f8ff;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  //font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-grey-600);
  outline-offset: -1px;
}


/* button:focus {
  outline: 2px solid var(--color-green-700);
  outline-offset: -1px;
} */


/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;
export default GlobalStyles;
