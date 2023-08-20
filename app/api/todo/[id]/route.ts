import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc, } from "firebase/firestore";
import { NextResponse } from "next/server";

// update todo completed api
export async function PATCH(req: Request, res: Response) {

    const id = req.url.slice(req.url.lastIndexOf('/') + 1);
    const isCompleted = await req.json();

    try {
        const ref = doc(db, "todos", id)
        const docSnap = await getDoc(ref);
        if (docSnap.data()) {
            await updateDoc(ref, {
                ...docSnap.data(),
                isCompleted
            })
            console.log("Document data:", docSnap.data());
            return NextResponse.json({ response: "ok", message: "success" })

        } else {
            return NextResponse.json({ "response": "success", "todo": "NO Result" }, { status: 200 })
        }
    } catch (err) {
        return NextResponse.json({ error: "failed to delete" }.error, {
            status: 500,
        })
    }

}

// update todo api
export async function PUT(req: Request, res: Response) {

    const id = req.url.slice(req.url.lastIndexOf('/') + 1);
    const todo = await req.json();

    // console.log(todo)
    try {
        const collectionRef = collection(db, "todos")
        const check: {}[] = []

        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            check.push({
                ...doc.data(), id: doc.id,
                createdAt: doc.data().createdAt?.toDate()
            });
        });

        const isHas = check.filter(isHas => isHas.todo === todo);
        console.log(isHas);
        if (isHas.length > 0) {
            return NextResponse.json({ response: "ok", message: "Todo is already have" })
        } else {
            const ref = doc(db, "todos", id)
            const docSnap = await getDoc(ref);
            if (docSnap.data()) {
                await updateDoc(ref, {
                    todo: todo
                })
                console.log("Document data:", docSnap.data());

                const update = {
                    id: id,
                    todo: todo,
                    isCompleted: docSnap.data()?.isCompleted,
                    createdAt: docSnap.data()?.createdAt
                }
                return NextResponse.json({ "response": "success", "todo": update }, { status: 200 })

            } else {
                return NextResponse.json({ "response": "success", "todo": "NO Result" }, { status: 200 })
            }

        }
    } catch (err) {
        return NextResponse.json({ error: "failed to update" }.error, {
            status: 500,
        })
    }

}
// delete todo api
export async function DELETE(req: Request, res: Response) {
    const id = req.url.slice(req.url.lastIndexOf('/') + 1)

    try {
        const ref = doc(db, "todos", id)
        const docSnap = await getDoc(ref);
        if (docSnap.data()) {
            await deleteDoc(ref)
            console.log("Document data:", docSnap.data());
            return NextResponse.json({ response: "ok" })
        } else {
            return NextResponse.json({ "response": "success", "todo": "NO Result" }, { status: 200 })
        }

    } catch (err) {
        return NextResponse.json({ error: "failed to delete" }.error, {
            status: 500,
        })
    }
}

