import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BannerHeading from "@/components/BannerHeading";
import TopBar from "@/components/TopBar";

export default async function DashPage() {
  const supabase = createClient();
  /* Allow user to view public quizzes without loggin in. */
  let userId = ""
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    userId= user.id} else {
      userId="No user logged in";
    }
    
  // FETCH QUIZ IDs TO FIND NUMBER OF QUIZZES MADE
const { data: quizFinalId } = await supabase.from('quizzes').select('*').order('id', { ascending: false }).limit(1);


/* Get the total quiz number*/
let totalQuizNumber: number;
if (quizFinalId !== null && quizFinalId.length > 0) {
  totalQuizNumber = quizFinalId[0]?.id || 0;
} else {
  totalQuizNumber = 0; // Or any default value you prefer
}

  return (
    <>
      <TopBar></TopBar>

      <BannerHeading heading="HOME"></BannerHeading>
      <div className="">
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 mt-5">
          <h2 className="text-3xl font-bold">JOIN THE REVOLUTION</h2>
          <div>{totalQuizNumber} quizzes have been made so far.</div>
          <div>Join us at Night quizzer.</div>
          <ul className="list-disc pl-4">
            <li>Create your own free private or public quizzes.</li>
            <li>Update your quizzes over time.</li>
            <li>Try other people's quizzes and record your progress.</li>
          </ul>
          <main className="flex-1 flex flex-col gap-6">
          </main>
        </div>
      </div>
    </>
);
}
