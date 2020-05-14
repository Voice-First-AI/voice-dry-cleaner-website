import React, {useRef} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles,
  TextField,
  Button
} from "@material-ui/core";
import calculateSpacing from "./calculateSpacing";

const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    }
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  }
});

function NewFreeCleanerSection(props) {
  const { width, classes, btnClickFx } = props;
  const cleanerName = useRef();
  const cleanerPhoneNumber = useRef();
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Create a New Free Cleaner on Amazon Alexa
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={12}
            lg={6}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name of Dry Cleaner"
              autoFocus
              inputRef={cleanerName}
              autoComplete="off"
              onChange={() => {
                // TODO: Check for Valid Alexa Skill Naming Conventions
              }}
              FormHelperTextProps={{ error: true }}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={12}
            lg={6}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="tel"
              label="Phone #"
              inputRef={cleanerPhoneNumber}
              autoFocus
              autoComplete="off"
              onChange={() => {
                // TODO: Check for Valid Alexa Skill Naming Conventions
              }}
              FormHelperTextProps={{ error: true }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.cardWrapper}
          data-aos="zoom-in-up"
          data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
          >
            <Grid
              item
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.cardWrapper}
              xs={6}
              sm={6}
              lg={6}
              data-aos="zoom-in-up"
              data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
              >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.extraLargeButton}
                    classes={{ label: classes.extraLargeButtonLabel }}
                    onClick={() => { btnClickFx(cleanerName, cleanerPhoneNumber)}}
                    >
                  Create Cleaner
                </Button>
              </Grid>
        </Grid>
      </div>
    </div>
  );
}

NewFreeCleanerSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(NewFreeCleanerSection)
);
