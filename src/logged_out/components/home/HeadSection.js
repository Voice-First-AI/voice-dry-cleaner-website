import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  Card,
  Button,
  Hidden,
  Box,
  withStyles,
  withWidth,
  isWidthUp
} from "@material-ui/core";
import WaveBorder from "../../../shared/components/WaveBorder";

const styles = theme => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize
    }
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("lg")]: {
      width: "auto"
    }
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2)
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4]
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3)
    }
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important"
    }
  },
  waveBorder: {
    paddingTop: theme.spacing(4)
  }
});

function HeadSection(props) {
  const { classes, theme, width } = props;
  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, "container")}>
                <Box justifyContent="space-between" className="row">
                  <Grid item xs={12} md={5}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <Box mb={4}>
                        <Typography
                          variant={isWidthUp("lg", width) ? "h3" : "h4"}
                        >
                          Free Amazon Alexa Skills for Cleaners
                        </Typography>
                      </Box>
                      <div>
                        <Box mb={2}>
                          <Typography
                            variant={isWidthUp("lg", width) ? "h6" : "body1"}
                            color="textSecondary"
                          >
                            Built by dry cleaners for dry cleaners, wash-n-fold services, house cleaning services, and any other home services! Perfect for post-pandemic growth.
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          className={classes.extraLargeButton}
                          classes={{ label: classes.extraLargeButtonLabel }}
                          href="#getStarted"
                        >             

                          Get Started for FREE
                        </Button>
                        <p></p>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          className={classes.extraLargeButton}
                          classes={{ label: classes.extraLargeButtonLabel }}
                          href="https://www.facebook.com/VoiceDryCleaner/"
                        >
                          Find us on Facebook
                        </Button>
                      </div>
                    </Box>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={6}>
                    <iframe title="teaser" width="560" height="315" src="https://www.youtube.com/embed/3ojo4S8RG1M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Grid>
                  </Hidden>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
