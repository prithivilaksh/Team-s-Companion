//import library
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDocs, getDoc, setDoc, query, where, orderBy, enableIndexedDbPersistence } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithRedirect, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref,  getDownloadURL } from "firebase/storage";
import { navigate } from "@reach/router";
import { nanoid } from "nanoid";
// import { uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCV3JPo6aJslmdWAwGLaGKNbDuE_GcAKtE",
  authDomain: "sip-1-b4f62.firebaseapp.com",
  projectId: "sip-1-b4f62",
  storageBucket: "sip-1-b4f62.appspot.com",
  messagingSenderId: "780612818322",
  appId: "1:780612818322:web:9abaa59c20f29c82f89d4b",
  measurementId: "G-GZ9WEZPYVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const fs = getStorage(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    window.showAlert("Multiple tabs open close others.");
  } else if (err.code === 'unimplemented') {
    window.showAlert("Offline not supported.");
  }
});

let activeUser = {};
let userProfile = {
  staffTagList: []
};
let isUserLogin = false;

const authStatus = (path, callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      activeUser = user;
      getRecord("User", user.uid, (result, error) => {
        if (!error) {
          userProfile = result;
        } else {
          userProfile = {
            id: user.uid,
            email: user.email,
            roomInfo: null,
            type: "Student",
            staffTagList: []
          }
          createRecord(createItem("User", user.uid, userProfile));
        }
        if (callback) {
          callback(true);
        }
      });
      isUserLogin = true;
      if (path !== "" && path !== window.location.pathname) {
        navigate(path);
      }
    }
    else {
      activeUser = null;
      isUserLogin = false;
      navigate("/login");
      if (callback) {
        callback(false);
      }
    }
  });
};

const leaveRoom = () => {
  userProfile.roomInfo = null;
  userProfile.staffTagList = [];
  userProfile.type = "Student";
  createRecord(
    createItem("User", userProfile.id, userProfile),
    (_, error) => {
      if (!error) {
        navigate("/room");
      } else {
        //reload to handle the profile with old data.
        window.location.reload();
      }
    }
  );
}

const signInWithGmail = (path, callback) => {
  signInWithRedirect(auth, provider).then((result) => {
    authStatus(path, callback);
  }).catch((error) => {
    console.log("User login error :", error)
    authStatus(path, callback);
  });
};

const signOutGmail = (callback) => {
  signOut(auth).then(() => authStatus("", callback)).catch(() => authStatus("", callback));
};

const createRoomKey = () => {
  return nanoid(5);
};

const createKey = () => {
  return nanoid()
};

const createItem = (table, id, obj) => {
  return { kind: table, key: id, data: obj };
};

const createRecord = (item, callback) => {
  setDoc(doc(db, item.kind, item.key), item.data).then(() => {
    if (callback) {
      callback(item.data, false);
    }
  }).catch((error) => {
    console.error(error, item);
    if (callback) {
      callback(error, true);
    }
  });
};

const createRecords = (items, callback) => {
  for (let item of items) {
    createRecord(item, callback);
  }
};

const getRecord = async (table, id, callback) => {
  getDoc(doc(db, table, id)).then((docSnap) => {
    if (docSnap.exists()) {
      if (callback) {
        callback(docSnap.data(), false);
      }
    } else {
      if (callback) {
        callback({ message: "No such object" }, true);
      }
    }
  }).catch((error) => {
    if (callback) {
      callback(error, true);
    }
  });
};


const getQueryForAllStaffTags = (roomId) => {
  return getSingleEqualFilter("StaffTag", "roomInfo.id", roomId);
}

const getQueryForAllEvents = (date, roomId) => {
  // console.log(date,roomId);
  return getMultipleEqualFilter("Event", [{ property: "roomInfo.id", value: roomId }, { property: "date", value: date }]);
}

const getQueryForAllEventsDay = (day, roomId) => {
  console.log(day,roomId);
  return getMultipleEqualFilter("Event", [{ property: "roomInfo.id", value: roomId }, { property: "day.id", value: day },{property: "recurring.id", value: "Weekly"}]);
}

const getQueryForAllAssignments = (date, roomId) => {
  return getMultipleEqualFilter("Assignment", [{ property: "roomInfo.id", value: roomId }, { property: "dueDate", value: date }]);
}

const getQueryForAllQuestion = (roomId) => {
  return getMultipleEqualFilterOrderBy("Forum", [{ property: "roomInfo.id", value: roomId }, { property: "qType", value: 'Q' }], "timeStamp");
  // return getMultipleEqualFilter("Forum", [{ property: "roomInfo.id", value: roomId }, { property: "qType", value: 'Q' }]);
};

const getQueryForQuestionAndAnswers = (qid) => {
  return getSingleEqualFilterOrderBy("Forum", "qid", qid, "timeStamp");
};

const getQueryForAllSubjects = (roomId) => {
  return getSingleEqualFilter("Tag", "roomInfo.id", roomId);
};

const getQueryForAllRoomsByStaff = (staffId) => {
  return getSingleEqualFilter("StaffRoom", "staffInfo.id", staffId);
}

const getQueryForAllStaffs = (roomId) => {
  return getSingleEqualFilter("StaffRoom", "roomInfo.id", roomId);
};

const getQueryForAllStudents = (roomId) => {
  return getSingleEqualFilter("User", "roomInfo.id", roomId);
};

const getSingleEqualFilterOrderBy = (table, property, value, order) => {
  return query(collection(db, table), where(property, "==", value), orderBy(order));
};

const getSingleEqualFilter = (table, property, value) => {
  return query(collection(db, table), where(property, "==", value));
};

const contains = (items,_item) => {
    for (let item of items ) {
      if (item.id === _item.id) return true;
    }
    return false;
};

const unique = (items) => {
  let arr = [];
  for (let item of items) {
      if (!contains(arr,item)) {
        arr.push(item);
      }
  }
  return arr;
  // return [...new Set(items.map(item => item.group))];
}

const getItemFilters = (items) => {
  let staffTagList = userProfile.staffTagList
  if (staffTagList) {
    return items.filter(item => findStaffTags(staffTagList, item.staffTag.id))
  }
  return items;
}

const findStaffTags = (items, id) => {
  for (let item of items) {
    if (item.id === id) {
      return true
    }
  }
  return false
}

const getMultipleEqualFilterOrderBy = (table, filters, order) => {
  let wheres = [];
  filters.forEach((item) => {
    wheres.push(where(item.property, "==", item.value));
  })
  return query(collection(db, table), ...wheres, orderBy(order));
}

const getMultipleEqualFilter = (table, filters) => {
  let wheres = [];
  filters.forEach((item) => {
    wheres.push(where(item.property, "==", item.value));
  })
  return query(collection(db, table), ...wheres);
}

const getDynamicDropdownData = (table, callback) => {
  if (userProfile.roomInfo && userProfile.roomInfo.id) {
    getRecords(getSingleEqualFilter(table, "roomInfo.id", userProfile.roomInfo.id), callback);
  }
}

const getRecords = (query, callback) => {
  getDocs(query).then((querySnapshot) => {
    let items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    if (callback) {
      console.log(items);
      callback(items, false);
    }
  }).catch((error) => {
    console.log(error);
    if (callback) {
      callback(error, true);
    }
  });
};

const downloadFile = (path, callback) => {
  const storageRef = ref(fs, path);
  getDownloadURL(storageRef)
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        if (callback) {
          callback(xhr.response, false);
        }
      };
      xhr.open('GET', url);
      xhr.send();
    })
    .catch((error) => {
      if (callback) {
        callback(error, true);
      }
    });
};

const getEmailAsID = (email) => {
  return email.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-').replace(/[-]+/g, '-');
}

const isAdmin = () => {
  return (userProfile.type === 'Admin');
}

const isStaff = (callback) => {
  getRecord('Staff', getEmailAsID(userProfile.email), callback);
}


// const uploadFile = (file, path, callback) => {
//   const storageRef = ref(fs, path);
//   uploadBytes(storageRef, file).then((snapshot) => {
//     if (callback) {
//       callback(snapshot, false);
//     }
//   }).catch((error) => { if (callback) { callback(error, true); } })

// };

export {
  isUserLogin, activeUser, userProfile,
  authStatus, signInWithGmail, signOutGmail,
  createKey, createRoomKey, createRecord, createRecords, createItem,
  getRecord, getRecords, getSingleEqualFilter, getSingleEqualFilterOrderBy,
  getQueryForQuestionAndAnswers, getQueryForAllSubjects, getQueryForAllStudents,
  getQueryForAllStaffs, downloadFile, getQueryForAllQuestion,  //uploadFile,
  getQueryForAllAssignments, getQueryForAllEvents, getQueryForAllRoomsByStaff,
  getItemFilters, isAdmin, isStaff, getEmailAsID, getDynamicDropdownData,
  leaveRoom, getQueryForAllStaffTags, getQueryForAllEventsDay,unique
};

