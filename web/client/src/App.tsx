import { Box, Container, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import Form from './components/Form'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box height="100vh" display={"flex"} flexDirection={"column"}>
          <Stack direction="row" spacing={0} alignItems="stretch" flex={1}>
            <Box flex={1} paddingTop={3} paddingBottom={3}>
              <Form />
            </Box>
            <Box flex={1} paddingTop={3} paddingBottom={3}>
              Test
            </Box>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
