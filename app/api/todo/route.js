import { NextResponse } from "next/server";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from '@/firebase'

// get all todos api
export async function GET() {

  try {
    const todo= []

    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      todo.push({
        ...doc.data(), id: doc.id,
        createdAt: doc.data().createdAt?.toDate()
      });
      // console.log(doc.id, " => ", doc.data());
    });
  
    return NextResponse.json(todo);
  } catch(err) {
    return NextResponse.json({"response": "failed"})
  }
  
};

// create a new todo api
export async function POST(req, res) {
  const todo = await req.json();

  if (!todo) return NextResponse.json({ response: "failed", message: "Todo is required" })

  try {
    const check = []

    const collectionRef = collection(db, "todos")

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
      // console.log(true)
      const docRef = await addDoc(collectionRef, {
        todo,
        isCompleted: false,
        createdAt: serverTimestamp()
      })

      const data = {
        id: docRef.id,
        todo: todo,
        isCompleted: false,
        createdAt: serverTimestamp()
      }
      return NextResponse.json({ response: "ok", "todo": data })
    }
  }catch(err) {
    return NextResponse.json({ response: "failed" })
  }
}
