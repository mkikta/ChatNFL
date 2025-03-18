import { createTheme } from "@mui/material";

// https://zenoo.github.io/mui-theme-creator/
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fce9c5', // Set a global background color for all Paper components
        },
      },
    },
  },
  typography: {
    fontFamily: "Futura Bold"
  },
  palette: {
    background: {
      default: "#4a2e04"
    },
    text: {
      primary: "#222222"
    }
  }
})

export default theme;