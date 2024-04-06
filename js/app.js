//import {initializeApp} from "firebase/app";
//import {getFirestore} from "firebase/firestore";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getFirestore,collection,getDocs,addDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
import { getAuth,GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxxm8UIqsP21p_jLKeDb01hGef4Xw3Tyo",
  authDomain: "taskmanager-605b9.firebaseapp.com",
  projectId: "taskmanager-605b9",
  storageBucket: "taskmanager-605b9.appspot.com",
  messagingSenderId: "716994293154",
  appId: "1:716994293154:web:4e20594c545062a64256fb"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
function googleSignIn() {
  const provider = new GoogleAuthProvider();
  auth().signInWithPopup(provider)
    .then((result) => {
      // User signed in successfully. You can access user information from `result.user`.
    })
    .catch((error) => {
      // Handle errors here.
    });
}
const emailSignInForm = document.getElementById('email-signin-form');
emailSignInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed in successfully. You can access user information from `userCredential.user`.
    })
    .catch((error) => {
      // Handle errors here.
    });
});


if (!db) {
  console.error("Firestore is not initialized correctly.");
} else {
  console.log("Firestore initialized successfully.");
}
// Add task
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('task-input').value;
  if (taskInput.trim() !== '') {
    const docRef = addDoc(collection(db,'tasks'), {
      task: taskInput
    });
    console.log("Document written with ID: ", docRef.id);
    taskForm.reset();
  }

});
async function getData(db) {
  const doc = collection(db,'tasks');
  const taskSnapshot = await getDocs(doc);
  let mydata;
  mydata = taskSnapshot.docs.map(doc => doc.data());
  return mydata;
}

// Display tasks
const taskList = document.getElementById('task-list');
taskList.innerHTML = '';
const taskData = getData(db);
const li = document.createElement('li');
li.textContent = taskData.task;
taskList.appendChild(li);

