
import { db, auth } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Save or Update a resume
export const saveResume = async (resumeData, existingId = null) => {
    const user = auth.currentUser;
    if (!user) return null; // Don't throw error for auto-save if guest

    try {
        if (existingId) {
            // Update existing
            const docRef = doc(db, "resumes", existingId);
            await updateDoc(docRef, {
                ...resumeData,
                updatedAt: serverTimestamp()
            });
            return existingId;
        } else {
            // Create new
            const docRef = await addDoc(collection(db, "resumes"), {
                ...resumeData,
                userId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            return docRef.id;
        }
    } catch (e) {
        console.error("Error saving resume: ", e);
        throw e;
    }
};

// Fetch all resumes for current user
export const getUserResumes = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "resumes"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const resumes = [];
    querySnapshot.forEach((doc) => {
        resumes.push({ id: doc.id, ...doc.data() });
    });
    return resumes;
};
// Fetch a single resume by ID
export const getResume = async (resumeId) => {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        const { getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        const docRef = doc(db, "resumes", resumeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Security check: only owner can read
            if (data.userId === user.uid) {
                return { id: docSnap.id, ...data };
            }
        }
        return null;
    } catch (e) {
        console.error("Error fetching resume: ", e);
        return null;
    }
};

// Delete a resume
export const deleteResume = async (resumeId) => {
    const user = auth.currentUser;
    if (!user) return false;

    try {
        const docRef = doc(db, "resumes", resumeId);
        await deleteDoc(docRef);
        return true;
    } catch (e) {
        console.error("Error deleting resume: ", e);
        return false;
    }
};
