"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function DeleteQuizByIDButton({quizId, userId}) {
  const [debug, setDebug] = useState("Default")

  const handleDelete = () => {
    setDebug("Function called")
    fetch(`/delete/${quizId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 5 }), // Include the ID you want to delete
    })
    .then(response => {
      if (response.ok) {
        console.log('Quiz deleted successfully');
        // You can add further UI updates or actions here
        setDebug(`Response: OK. The quiz has been deleted.`)

      } else {
        console.error('Failed to delete quiz');
        setDebug(`Error: "Failed to delete"`)
      }
    })
    .catch(error => {
      console.error('Error deleting quiz:', error);
      setDebug(`Error: ${error}`)

      // Handle any errors that occur during the fetch
    });
  };
  


    return (
      <>
        <button style={{color:"red"}} onClick={() => {handleDelete()}}>DELETE THIS QUIZ</button>
        <div>{debug}</div>
      </>

    );
  }
  