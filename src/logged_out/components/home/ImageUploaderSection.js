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

function ImageUploaderSection(props) {
  const { width, classes, alertText, alertValue, successAlertValue, firebase, cleanerName, voiceOverScript, voiceOverKey, getVoiceOverList } = props;
  const [recording, setRecordName] = useState("Record");
  const [recordingColor, setRecordingColor] = useState("primary");
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [progress, setProgress] = useState(0);

  /**
   * Sets starts countdown, and then sets recording status
   */
  const startRecordingStatus = async () => {
    setRecordingColor("secondary");
    setRecordName("3");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRecordName("2");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRecordName("1");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRecording(true);
    setRecordingColor("primary");
    setRecordName("Recording");
  };

/**
 * uploads MP3 url to firebase to user input or random if no input is provided.
 */
const uploadMP3 = async () => {
  const storageRef = firebase.storage().ref();
  let file = await fetch(blobURL).then(r => r.blob());
  let voiceOverFileName = voiceOverKey;
  voiceOverFileName = voiceOverFileName.replace(/[ ]/g, ".");
  voiceOverFileName = voiceOverFileName;
  const uploadTask = storageRef
    .child(`dry-cleaners/${cleanerName}/voiceOver/${voiceOverFileName}`)
    .put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progressNumber = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progressNumber);
    },
    e => console.error(e),
    () => {
      alert("SUCCESSFUL UPLOAD")
      setBlobURL("");
      getVoiceOverList();
    }
  );
};


  /**
   * sets BlobURL state to the incoming blob url.
   * @param {*} recordedBlob - blob url of recorded audio stream.
   */
  const onStop = async (recordedBlob) => {
    setBlobURL(recordedBlob);
  };

  /**
   * resets Recording button color and name to initial and sets recording status to false.
   */
  const stopRecordingStatus = () => {
      setIsRecording(false);
      setRecordingColor("primary");
      setRecordName("Record");
  };

  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Logo Uploader for {cleanerName} on Amazon Alexa
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

        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >

             <div>
              <div>
                  <Grid
                    className={classes.cardWrapper}
                    item 
                    xs={12} 
                    sm={12} 
                    md={4} 
                    data-aos="zoom-in-up"
                    data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
                    >
                      
                    <div
                      style={{
                        display: "table",
                        width: "100%",
                        tableLayout: "fixed",
                        borderSpacing: "10px"
                      }}
                    >
                      <Button
                        targe="_blank"
                        variant="contained"
                        color="primary"
                        // onClick={handleClickOpen}
                      >
                        +
                      </Button>
                    </div>
                  </Grid>
                  <div>
                    <Grid
                      item 
                      xs={12} 
                      sm={6}>
                      
                    </Grid>
                    <ReactMediaRecorder
                      audio
                      onStop={onStop}
                      render={({
                        status,
                        startRecording,
                        stopRecording,
                        mediaBlobUrl
                      }) => (
                        <div>
                          <audio
                        src={mediaBlobUrl}
                        controls="controls"
                        style={{
                          visibility: mediaBlobUrl ? "visible" : "hidden"
                        }}
                      />
                          <Button
                            target="_blank"
                            variant="contained"
                            fullWidth
                            className={classes.extraLargeButton}
                            classes={{ label: classes.extraLargeButtonLabel }}
                            color={recordingColor}
                            onClick={() => {
                              startRecordingStatus().then(() => {
                                startRecording();
                              });
                              startRecording();
                            }}
                            round
                            disabled={isRecording}
                          >
                            <b>{recording}</b>
                          </Button>
                          <Button
                            target="_blank"
                            round
                            variant="contained"
                            color="secondary"
                            fullWidth
                            className={classes.extraLargeButton}
                            classes={{ label: classes.extraLargeButtonLabel }}
                            onClick={() => {
                              stopRecordingStatus();
                              stopRecording();
                            }}
                            disabled={!isRecording}
                          >
                            <b>Stop</b>
                          </Button>
                        </div>
                      )}
                    />
                  </div>
              </div>
              <div>
                <Grid 
                  item 
                  xs={6}
                  >
                  <Button
                    target="_blank"
                    round
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className={classes.extraLargeButton}
                    classes={{ label: classes.extraLargeButtonLabel }}
                    onClick={uploadMP3}
                    disabled={blobURL.length < 5 || isRecording}
                  >
                    <b>Upload</b>
                  </Button>
                </Grid>
                <Grid item>
                  <LinearProgress 
                    variant="determinate"
                    color="primary"
                    style={{ visibility: progress === 0 ? "hidden" : "visible" }}
                    value={progress}
                  />
                </Grid>
              </div>
            </div>
        </Grid>
      </div>
    </div>
  );
}

ImageUploaderSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(ImageUploaderSection)
);
