import React, {useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles,
  Button
} from "@material-ui/core";
import { 
  Alert,
  AlertTitle
} from '@material-ui/lab';
import calculateSpacing from "./calculateSpacing";
import { DropzoneArea } from 'material-ui-dropzone';

function ImageUploaderSection(props) {
  const { width, classes, alertText, alertValue, successAlertValue, firebase, cleanerName } = props;

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
                      <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        filesLimit={1}
                        onChange={(files) => console.log('Files:', files)}
                      />
                    </div>
                  </Grid>
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
                    // onClick={uploadMP3}
                    // disabled={blobURL.length < 5 || isRecording}
                  >
                    <b>Upload</b>
                  </Button>
                </Grid>
              </div>
            </div>
        </Grid>
      </div>
    </div>
  );
}

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

ImageUploaderSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(ImageUploaderSection)
);
