import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DeleteAPI({params}) {
  const quizId=params.updateInformation.split("___")[0]
  const name=params.updateInformation.split("___")[1]
  const questions=params.updateInformation.split("___")[2]
  const description=params.updateInformation.split("___")[3]
  console.log("Hello")
  console.log(name, description, questions)
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data, error } = await supabase.from('quizzes')
  .update({ 
      name: name,
      description: description,
      questions: [questions]
  })
  .eq('id', quizId)
  .eq('user_id', user.id);


  return (
    <div>
    </div>
  );
}
