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
  if (isCleanerValid(newCleanerName)){ 
    addNewCleanerToFirebaseAndAdmin(newCleanerName, newCleanerPhoneNumber);
  }
}

function isCleanerValid(cleanerName) {
  alert("cleanerName: " + cleanerName);
  let isValid = true;
  if (cleanerName.trim().indexOf(' ') === -1) {
    isValid = false;
    alert("Amazon Alexa naming error: Cleaner name must be at least 2 words. Please update your cleaner name & try again.")
  } if (cleanerName.length < 2 || cleanerName.length > 49) {
    isValid = false;
    alert("Amazon Alexa naming error: Cleaner name must be between 2-50 characters. " + cleanerName + " is " + cleanerName.length + " characters long. Please update your cleaner name & try again.")
  }
  return isValid;
}

//
// add new unique company and code to firebase
// 
function addNewCleanerToFirebaseAndAdmin(cleanerName, phoneNumber) {
  db.collection("dry-cleaners").doc(cleanerName).set({
        cleanerDisplayName: cleanerName,
        PhoneNumber: phoneNumber,
        companyCode: cleanerName,
        // creatorFirebaseID: user.uid,
        // creatorEmailVerified: user.emailVerified,
        // creatorName: user.displayName,
        // creatorEmail: user.email,
        // creatorPhoto: user.photoURL,
  })
  .then(function() {// Successfully Created Cleaner! 
      //Add Cleaner to User Profile
      // addCleanerToAdmin(cleanerName)
      alert(cleanerName + " ADDED TO FIREBASE! Great work :)")
  })
  .catch(function(error) {
      console.error("Error creating new cleaner: ", error);
  });
}

// //
// //  addCleanerToAdmin Check if user is authorized to add EXISTING dry cleaner
// //
// function addCleanerToAdmin(cleaner) {
//   const dryCleaner = cleaner;
//   console.log("CLEANER: " + dryCleaner)
//   // Add a new document in collection "admins"
//   db.collection("admins").doc(user.uid).set({
//       cleaner: dryCleaner,
//       phoneNumber: $("#phoneNumber").val()
//   })
//   .then(function() {
//       console.log("Document successfully written!");
//       sendCustomerHome()
//   })
//   .catch(function(error) {
//       console.error("Error writing document: ", error);
//   });
// }

// 
// sendCustomerHome - send customer to main dashboard with connected cleaner
// 
function sendCustomerHome() {
  window.location.replace("../home")
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
