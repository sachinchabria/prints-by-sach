import { css } from 'styled-components';
import theme from './theme';
const { colors, fontSizes } = theme;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  engulf: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,

  outline: css`
    outline: 1px solid red;
  `,

  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,

  coverShadow: css`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  `,

  button: css`
    display: inline-block;
    background-color: ${colors.black};
    color: ${colors.white};
    font-weight: 700;
    font-size: ${fontSizes.sm};
    text-transform: uppercase;
    border-radius: 50px;
    padding: 11px 24px;
    cursor: pointer;
    transition: ${theme.transition};

    &:hover,
    &:focus {
      color: ${colors.white};
      background: ${colors.darkGrey};
    }
  `,
};

export default mixins;