import React, { useState } from "react";
import { db } from '../firebase'

const useFirestore = (collection, condition) => {

    const [documents, setDocuments] = useState([]);
    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt');

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]);
                return;
            }
            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            );
        }

        const unsub = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))

            setDocuments(documents)
        })
        return unsub;
    }, [collection, condition])
    return documents;
}

export default useFirestore;

