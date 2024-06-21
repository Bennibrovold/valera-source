import { css } from "styled-components";

type SN = string | number;

const f = (v: SN) => {
  if (typeof v === "number") return `${v}px`;
  if (typeof v === "string") return v;
  return v;
};
const getPxNumber = (value: SN) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value);
  return value;
};
const media = {
  size: {
    xxs: 376.95,
    xss: 374.95,
    xs: 575.95,
    sm: 767.95,
    md: 991.95,
    lg: 1199.95,
  } as const,

  /** @deprecated */
  between: (v1: SN, v2: SN) => (styles: TemplateStringsArray) =>
    css`
      @media (min-width: ${f(v1)}) and (max-width: ${f(v2)}) {
        ${css(styles)}
      }
    `,

  /** @deprecated */
  less:
    (v: SN) =>
    (...styles: TemplateStringsArray) =>
      css`
        @media (max-width: ${f(v)}) {
          ${css(styles)}
        }
      `,

  /** @deprecated */
  greater:
    (v: SN) =>
    (...styles: TemplateStringsArray) =>
      css`
        @media (min-width: ${f(v)}) {
          ${css(styles)}
        }
      `,

  pure: {
    between:
      (v1: SN, v2: SN) =>
      ({ theme }) => {
        if (theme && theme.mediaDeviceWidth) {
          const min = getPxNumber(v1);
          const max = getPxNumber(v2);

          const deviceWidth = theme.mediaDeviceWidth as number;

          return min < deviceWidth && deviceWidth < max
            ? "@media all"
            : "@media not all";
        }

        return `@media (min-width: ${f(v1)}) and (max-width: ${f(v2)})`;
      },
    less:
      (v: SN) =>
      ({ theme }) => {
        if (theme) {
          const { isMobile } = theme;

          if (isMobile) {
            if (v > media.size.sm) {
              return `@media (max-width: ${f(0)})`;
            } else {
              return `@media (max-width: ${f(10000)})`;
            }
          }
        }
        if (theme && theme.mediaDeviceWidth) {
          const max = getPxNumber(v);

          const deviceWidth = theme.mediaDeviceWidth as number;

          return deviceWidth < max ? "@media all" : "@media not all";
        }
        return `@media (max-width: ${f(v)})`;
      },
    greater:
      (v: SN) =>
      ({ theme }) => {
        if (theme) {
          const { isMobile } = theme;

          if (isMobile) {
            if (v >= media.size.sm) {
              return `@media (min-width: ${f(10000)})`;
            } else {
              return `@media (min-width: ${f(0)})`;
            }
          }
        }

        if (theme && theme.mediaDeviceWidth) {
          const min = getPxNumber(v);

          const deviceWidth = theme.mediaDeviceWidth as number;

          return deviceWidth > min ? "@media all" : "@media not all";
        }

        return `@media (min-width: ${f(v)})`;
      },
  },
};

export { media };
