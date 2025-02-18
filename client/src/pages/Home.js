import "../App.css";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Auth from "../utils/auth";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const Home = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box className="background">
        <Box className="jumbotron hero">
          <Container>
            <Typography
              variant="h1"
              align="center"
              color="primary"
              className="hero-text">
              Cinegraph
            </Typography>
          </Container>
        </Box>
        <Container className="description">
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent={"center"}>
            <Grid item xs={5}>
              <Card sx={{ minHeight: 155 }}>
                <Typography
                  variant="h5"
                  align="center"
                  className="description-header">
                  Visualize Cinema Data
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className="description-content">
                  Cinegraph is a proof of concept data visualization tool to see
                  how box office returns and review scores trend together for
                  movies.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container className="call-to-action">
          {!Auth.loggedIn() ? (
            <Typography variant="h4" align="center">
              Please{" "}
              <Link href="/login" color="rgb(#0000EE)">
                log in
              </Link>{" "}
              or{" "}
              <Link href="/signup" color="rgb(#0000EE)">
                sign up
              </Link>{" "}
              to access our full functionality.
            </Typography>
          ) : (
            <Typography variant="h4" align="center">
              You are logged in! Use the navigation links above to view your
              dashboard!
            </Typography>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
