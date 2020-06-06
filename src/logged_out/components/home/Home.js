import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import NewFreeCleanerSection from "./NewFreeCleanerSection";
import VoiceOverSection from "./VoiceOverSection";
import firebase from 'firebase';

// Init Firebase
const serviceAccount = require("../../../serviceAccountKey.json");
firebase.initializeApp(serviceAccount);
let db = firebase.firestore();
const storageRef = firebase.storage().ref();

function Home(props) {
  const { selectHome } = props;
  const [value, setValue] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const [cleanerName, setCleanerName] = useState(null);
  const [voiceOverIndex, setVoiceOverIndex] = useState(0);
  const VOICE_OVER_KEYS = [
    "welcome.speech",
    "end.speech",
    "help.global.speech",
    "unhandled.global.speech",
    "what.are.your.hours.speech",
    "what.are.your.specials.speech",
    "where.are.you.located.speech"
  ]
  const VOICE_OVER_SCRIPTS = [
    "Welcome to my cleaner! You can say, what are your hours, what are your specials, Or, you can say where are you located. How can I help you?",
    "Thanks for your business. Come back anytime!",
    "You can say, what are your hours, what are your specials, Or, you can say where are you located. How can I help you?",
    "Uh oh. I'm not quite that smart yet.",
    "We are open <insert your cleaners hours here>.",
    "Currently we're runnign a special on <insert your cleaners specials here>.",
    "You can find us at <insert your cleaners address here>"
  ]
  useEffect(() => {
    selectHome();
    getCleanerName();
  }, [selectHome]);

  const btnClickFx = (cleanerName, cleanerPhoneNumber, setAlertValue, setSuccessAlertValue) => {
    const newCleanerName = cleanerName.current.value.toLowerCase();
    const newCleanerPhoneNumber = cleanerPhoneNumber.current.value;
    if (isCleanerValid(newCleanerName, newCleanerPhoneNumber, setAlertValue)){ 
      setAlertValue(null);
      addNewCleanerToFirebaseAndAdmin(newCleanerName, newCleanerPhoneNumber, setSuccessAlertValue);
    } else {
      setSuccessAlertValue(null);
    }
  }

  const isCleanerValid = (cleanerName, cleanerPhoneNumber, setAlertValue) => {
    let isValid = true;
    if (!firebase.auth().currentUser) {
      isValid = false;
      setAlertValue("User error: Must be signed in to create FREE cleaner. Please sign in and try again.")
    } else if (cleanerName.trim().indexOf(' ') === -1) {
      isValid = false;
      setAlertValue("Name of Dry Cleaner must be at least 2 words. Please update your Name of Dry Cleaner & try again.")
    } else if (cleanerName.length < 2 || cleanerName.length > 49) {
      isValid = false;
      setAlertValue("Name of Dry Cleaner must be between 2-50 characters. " + cleanerName + " is " + cleanerName.length + " characters long. Please update your Name of Dry Cleaner & try again.")
    } else if (/\d/.test(cleanerName)){
      isValid = false;
      setAlertValue("Name of Dry Cleaner must not contain any DIGITS[0-9]. Please rename any digits to their alphabetical spelling. Please update your Name of Dry Cleaner & try again.")
    } else if (!cleanerPhoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
      isValid = false;
      setAlertValue("Phone Error: Invalid phone number. Please update your cleaner phone number & try again.")
    }
    return isValid;
  }

  //
  // add new unique company and code to firebase
  // 
  const addNewCleanerToFirebaseAndAdmin = (cleanerName, phoneNumber, setSuccessAlertValue) => {
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
        addCleanerToAdmin(cleanerName, phoneNumber, setSuccessAlertValue)
    })
    .catch(function(error) {
        console.error("Error creating new cleaner: ", error);
    });
  }

  //
  //  addCleanerToAdmin Check if user is authorized to add EXISTING dry cleaner
  //
  const addCleanerToAdmin = (cleanerName, phoneNumber, setSuccessAlertValue) => {
    setSuccessAlertValue("Your Voice Dry Cleaner, " + cleanerName + ", Alexa Skill is being created! This will take ~20 minutes. Check your email for the next steps.")
    const user = firebase.auth().currentUser;
    // Add a new document in collection "admins"
    db.collection("admins").doc(user.uid).set({
      company: cleanerName,
      phoneNumber: phoneNumber
    })
    .then(function() {
      setCleanerName(cleanerName);
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  //
  // getVoiceOverList - Retrieves List of Voiceover Files from Firebase Storage
  //
  const getVoiceOverList = () => {
    alert("Get VoiceOverList.")
    if (cleanerName) {//USER has existing cleaner.
        console.log("cleaner 0:" + cleanerName)
        alert("Getting VoiceOverList for " + cleanerName)
        let scriptIndex;
        storageRef.child('dry-cleaners/' + cleanerName + '/voiceOver').listAll().then((res) => {
            scriptIndex = res.items.length ? res.items.length : 0;
            setVoiceOverIndex(scriptIndex)
            alert("New Voiceover Index: " + scriptIndex)
            console.log(VOICE_OVER_SCRIPTS[scriptIndex])
            alert("New VOiceOver Script: " + VOICE_OVER_SCRIPTS[scriptIndex])
            alert(scriptIndex + " voiceover files uploaded")
        })
        .catch((error) => {
          console.log(error)
        })
    }                      
  }

  //
  //getCleanerName - Gets Admin Cleaner Name
  //
  const getCleanerName = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('admins').doc(user.uid).get().then(function(userDoc) {
          if (userDoc.exists) {
              const cleaner = userDoc.data().company;
              setCleanerName(cleaner); 
              getVoiceOverList();                    
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      }
    })
  }

  return (
    <Fragment>
      <HeadSection />
      <FeatureSection />
      <PricingSection />
      { !cleanerName ? <NewFreeCleanerSection 
          btnClickFx={btnClickFx} 
          alertText={value} 
          setAlertValue={setValue} 
          alertValue={value} 
          setSuccessAlertValue={setSuccessAlert} 
          successAlertValue={successAlert}
        /> : null }
      { cleanerName ? <VoiceOverSection 
          firebase={firebase} 
          btnClickFx={btnClickFx} 
          alertText={value} 
          setAlertValue={setValue} 
          alertValue={value} 
          setSuccessAlertValue={setSuccessAlert} 
          successAlertValue={successAlert}
          cleanerName={cleanerName}
          getVoiceOverList={getVoiceOverList}
          voiceOverScript={VOICE_OVER_SCRIPTS[voiceOverIndex]}
        /> : null }
    </Fragment>
  );
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;