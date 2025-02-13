import { Box, Container, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import Form from './components/Form'
import { QueryContextProvider } from './context/QueryContext'
import { ResponseContextProvider } from './context/ResponseContext'
import ResponseDisplay from './components/ResponseDisplay'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box height="100vh" display={"flex"} flexDirection={"column"}>
          <ResponseContextProvider>
            <Stack direction="row" spacing={0} alignItems="stretch" flex={1}>
              <Box flex={1} paddingTop={3} paddingBottom={3}>
                <QueryContextProvider>
                  <Form />
                </QueryContextProvider>
              </Box>
              <Box flex={1} paddingTop={3} paddingBottom={3}>
                <ResponseDisplay/>
              </Box>
            </Stack>
          </ResponseContextProvider>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
