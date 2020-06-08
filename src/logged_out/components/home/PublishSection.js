import React, {useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles,
  Button,
  LinearProgress
} from "@material-ui/core";
import { 
  Alert,
  AlertTitle
} from '@material-ui/lab';
import calculateSpacing from "./calculateSpacing";
import { ReactMediaRecorder } from "react-media-recorder";

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

function PublishSection(props) {
  const { width, classes, alertText, alertValue, successAlertValue, cleanerName, voiceOverKeys, setSuccessAlertValue } = props;

  const submitAlexaSkill = () => {
    alert("Publish Alexa Skill for " + cleanerName)
    // create a new XMLHttpRequest
    var publishXhr = new XMLHttpRequest()

    // get a callback when the server responds
    publishXhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(publishXhr.responseText)
        setSuccessAlertValue(cleanerName + " Alexa Skill submitted for certification! Check you email for next steps.")
    })
    // open the PUBLISH_API request with the verb and the url
    publishXhr.open('POST', 'https://us-central1-mydrycleaner-be879.cloudfunctions.net/submitAlexaSkill')
    // send the PUBLISH_API request
    publishXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    publishXhr.send(JSON.stringify({ 
        name: cleanerName
    }))
  }
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Review {"&"} Publish {cleanerName} on Amazon Alexa
      </Typography>
      
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cardWrapper}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
            >
              {voiceOverKeys.map(voiceOverAudio => (
                <Grid
                item
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.cardWrapper}
                xs={12}
                sm={12}
                lg={12}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
                >
                  <p>{voiceOverAudio}</p>
                  <audio
                    src={"https://firebasestorage.googleapis.com/v0/b/mydrycleaner-be879.appspot.com/o/dry-cleaners%2Fjune%20fifth%20cleaner%20thousanf%2FvoiceOver%2F" + voiceOverAudio + ".mp3?alt=media"}
                    controls="controls"
                  />
                </Grid>
                ))}
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
                    onClick={submitAlexaSkill}
                    >
                  Publish
                </Button>

              <Alert severity="error" style={{display: alertValue ? true : "none"}}>
                <AlertTitle>Error</AlertTitle>
                <strong>{alertText}</strong>
              </Alert>

              <Alert severity="success" style={{display: successAlertValue ? true : "none"}}>
                <AlertTitle>Congrats!</AlertTitle>
                <strong>{successAlertValue}</strong>
              </Alert>
            </Grid>

        </Grid>
      </div>
    </div>
  );
}

PublishSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(PublishSection)
);
