import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import NewFreeCleanerSection from "./NewFreeCleanerSection";
import firebase from 'firebase';

// Init Firebase
const serviceAccount = require("../../../serviceAccountKey.json");
firebase.initializeApp(serviceAccount);
let db = firebase.firestore();

function Home(props) {
  const { selectHome } = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);
  return (
    <Fragment>
      <HeadSection />
      <FeatureSection />
      <PricingSection />
      <NewFreeCleanerSection btnClickFx={btnClickFx}/>
    </Fragment>
  );
}

function btnClickFx(cleanerName, cleanerPhoneNumber) {
  const newCleanerName = cleanerName.current.value.toLowerCase();
  const newCleanerPhoneNumber = cleanerPhoneNumber.current.value;
  if (isCleanerValid(newCleanerName, newCleanerPhoneNumber)){ 
    addNewCleanerToFirebaseAndAdmin(newCleanerName, newCleanerPhoneNumber);
  }
}

function isCleanerValid(cleanerName, cleanerPhoneNumber) {
  let isValid = true;
  if (!firebase.auth().currentUser) {
    isValid = false;
    alert("User error: Must be signed in to create FREE cleaner. Please sign in and try again.")
  } else if (cleanerName.trim().indexOf(' ') === -1) {
    isValid = false;
    alert("Amazon Alexa naming error: Cleaner name must be at least 2 words. Please update your cleaner name & try again.")
  } else if (cleanerName.length < 2 || cleanerName.length > 49) {
    isValid = false;
    alert("Amazon Alexa naming error: Cleaner name must be between 2-50 characters. " + cleanerName + " is " + cleanerName.length + " characters long. Please update your cleaner name & try again.")
  } else if (/\d/.test(cleanerName)){
    isValid = false;
    alert("Amazon Alexa naming error: Cleaner name must not contain any DIGITS[0-9]. Please rename any digits to their alphabetical spelling. Please update your cleaner name & try again.")
  } else if (!cleanerPhoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
    isValid = false;
    alert("Phone Error: Invalid phone number. Please update your cleaner phone number & try again.")
  }
  return isValid;
}

//
// add new unique company and code to firebase
// 
function addNewCleanerToFirebaseAndAdmin(cleanerName, phoneNumber) {
  const user = firebase.auth().currentUser;
  db.collection("dry-cleaners").doc(cleanerName).set({
        cleanerDisplayName: cleanerName,
        PhoneNumber: phoneNumber,
        companyCode: cleanerName,
        creatorFirebaseID: user.uid,
        creatorEmailVerified: user.emailVerified,
        creatorName: user.displayName,
        creatorEmail: user.email,
        creatorPhoto: user.photoURL,
  })
  .then(function() {// Successfully Created Cleaner! 
      //Cleaner successfully added
  })
  .catch(function(error) {
      console.error("Error creating new cleaner: ", error);
  });
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
