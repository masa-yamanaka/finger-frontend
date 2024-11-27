// https://mui.com/material-ui/customization/palette/

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // default MUI blue color
      dark: "#005b96", // MediaSearch+ blue
    },
  },
});

export default theme;
