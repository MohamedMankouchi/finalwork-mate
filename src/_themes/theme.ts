import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#EDF9FF",
      200: "#2AACE2",
      300: "#FF8B52",
      400: "#7C1919",
    },
  },

  fontSizes: {
    lg: "48px",
    m: "18px",
    sm: "14px",
    xs: "12px",
  },

  fontWeights: {
    black: 900,
    bold: 700,
    extrabold: 800,
    hairline: 100,
    light: 300,
    medium: 500,
    normal: 400,
    semibold: 600,
    thin: 200,
  },

  fonts: {
    body: "Gabarito, sans-serif",
    heading: "Gabarito, sans-serif",
  },

  space: {
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    2: "0.5rem",
    2.5: "0.625rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    3: "0.75rem",
    3.5: "0.875rem",
    32: "8rem",
    36: "9rem",
    4: "1rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    5: "1.25rem",
    52: "13rem",
    56: "14rem",
    6: "1.5rem",
    60: "15rem",
    64: "16rem",
    7: "1.75rem",
    72: "18rem",
    8: "2rem",
    80: "20rem",
    9: "2.25rem",
    96: "24rem",
    px: "1px",
  },
});
