// https://mui.com/material-ui/customization/palette/

import { createTheme } from "@mui/material/styles";
// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

const theme = createTheme({
  // cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // default MUI blue color
      dark: "#005b96", // MediaSearch+ blue
    },
  },
  // typography: {
  //   fontFamily: roboto.style.fontFamily,
  // },
});

export default theme;
