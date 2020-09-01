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
  CircularProgress
} from "@material-ui/core";
import { 
  Alert,
  AlertTitle
} from '@material-ui/lab';

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
  const [isPublishing, setIsPublishing] = useState(false);
  const { width, classes, alertText, alertValue, successAlertValue, cleanerName, cleanerLogo, voiceOverKeys, setSuccessAlertValue } = props;

  const submitAlexaSkill = async () => {
    // create a new XMLHttpRequest
    var publishXhr = new XMLHttpRequest()

    // get a callback when the server responds
    publishXhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(publishXhr.responseText)
        setIsPublishing(false);
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

  const addBetaTester = async () => {
    // create a new XMLHttpRequest
    var publishXhr = new XMLHttpRequest()

    // get a callback when the server responds
    publishXhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(publishXhr.responseText)
        setSuccessAlertValue(cleanerName + " Alexa Skill beta test email sent! Check you email for next steps.")
    })
    // open the PUBLISH_API request with the verb and the url
    publishXhr.open('POST', 'https://us-central1-mydrycleaner-be879.cloudfunctions.net/betaTesters')
    // send the PUBLISH_API request
    publishXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    publishXhr.send(JSON.stringify({ 
        name: cleanerName
    }))
  }

  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="mg-bottom">
        Review {"&"} Publish {cleanerName} on Amazon Alexa
      </Typography>
      
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Typography variant="h3" align="center" >
          Logo
        </Typography>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cardWrapper}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
            >
              
              <img src={cleanerLogo}></img>
        </Grid>
        <Typography variant="h3" align="center">
          Voice Recordings
        </Typography>
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
                alignItems="space-around"
                alignText="center"
                className={classes.cardWrapper}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
                >
                  <h3>{voiceOverAudio.replace("_output"," message").replace(/\./g, " ").replace("global", "")}</h3>
                  <audio xs={12}
                    src={"https://firebasestorage.googleapis.com/v0/b/mydrycleaner-be879.appspot.com/o/dry-cleaners%2F" + cleanerName + "%2FvoiceOver%2F" + voiceOverAudio + ".mp3?alt=media"}
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
              data-aos="zoom-in-up"
              data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
              >
                {isPublishing ? 
                  <CircularProgress color="secondary" /> : 
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.extraLargeButton}
                    classes={{ label: classes.extraLargeButtonLabel }}
                    onClick={async () => {
                        setIsPublishing(true);
                        await addBetaTester();
                        await submitAlexaSkill();
                      }
                    }
                    >
                    Publish
                  </Button>
                }
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
