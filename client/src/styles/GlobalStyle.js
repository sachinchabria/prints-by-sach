import { createGlobalStyle } from 'styled-components';
import theme from './theme';
const { colors, fontSizes, fonts, spacing } = theme;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Medium'), local('CircularStd-Medium'),
    url('../fonts/CircularStd-Medium.woff2') format('woff2'),
    url('../fonts/CircularStd-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Book'), local('CircularStd-Book'),
    url('../fonts/CircularStd-Book.woff2') format('woff2'),
    url('../fonts/CircularStd-Book.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Medium Italic'), local('CircularStd-MediumItalic'),
    url('../fonts/CircularStd-MediumItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-MediumItalic.woff') format('woff');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Black'), local('CircularStd-Black'),
    url('../fonts/CircularStd-Black.woff2') format('woff2'),
    url('../fonts/CircularStd-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Bold'), local('CircularStd-Bold'),
    url('../fonts/CircularStd-Bold.woff2') format('woff2'),
    url('../fonts/CircularStd-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Bold Italic'), local('CircularStd-BoldItalic'),
    url('../fonts/CircularStd-BoldItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-BoldItalic.woff') format('woff');
    font-weight: 700;
    font-style: italic;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Book Italic'), local('CircularStd-BookItalic'),
    url('../fonts/CircularStd-BookItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-BookItalic.woff') format('woff');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Black Italic'), local('CircularStd-BlackItalic'),
    url('../fonts/CircularStd-BlackItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-BlackItalic.woff') format('woff');
    font-weight: 900;
    font-style: italic;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    color: ${colors.black};
  }

  #root {
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.025em;
    margin: 0 0 10px;
    font-weight: 700;
  }

  h1, h2, h3 {
    font-weight: 900;
  }

  p {
    margin: 0 0 10px;
  }

  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: ${theme.transition};
    cursor: pointer;
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    vertical-align: middle;
  }

  input, textarea {
    color: ${colors.black};
    padding: ${spacing.xxs} ${spacing.sm};
    border: 1px solid ${colors.lightestGrey};
    border-radius: 4px; 
    transition: all 0.3s ease; 
    font-size: 16px;
    outline: none;
    &::placeholder {
      color: ${colors.lightGrey};
      transition: opacity 0.3s ease;
    }
    &:hover {
      border: 1px solid ${colors.lightGrey};
    }
    &:focus,
    &:active {
      border: 1px solid ${colors.lightGrey};
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    }
  }

  label {
    font-weight: 700;
    font-size: 14;
    margin-bottom: ${spacing.xs};
  }

  button {
    display: inline-block;
    color: ${colors.lightestGrey};
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    font-weight: 700;
    border-radius: 4px;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
    transition: ${theme.transition};
    width: fit-content;

    &:hover,
    &:focus {
      color: ${colors.grey};
      outline: 0;
    }
  }
`;

export default GlobalStyle;
