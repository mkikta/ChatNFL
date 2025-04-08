import { createTheme } from "@mui/material";

// https://zenoo.github.io/mui-theme-creator/
const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FAF9F5', // Set a global background color for all Paper components
                },
                elevation1: {
                    boxShadow: 'none',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: 'none',
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                colorPrimary: {
                    color: '#BB5B39',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#BB5B39',
                },
            },
        }
    },
    typography: {
        fontFamily: "Futura Bold"
    },
    palette: {
        background: {
            default: "#F0EEE6"
        },
        text: {
            primary: "#222222"
        }
    }
})

export default theme;
