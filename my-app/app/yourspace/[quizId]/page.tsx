import { createClient } from "@/utils/supabase/server";
import QuizFull from "@/components/QuizFull";
import BannerHeading from "@/components/BannerHeading";
import TopBar from "@/components/TopBar";



/* Define interface for params, which contains the dynamic routing quizId. */
interface Params {
  quizId: string,
}


export default async function YourSpacePage({params}: {params: Params}) {
  const supabase = createClient();
  /* Allow user to complete public quizzes without loggin in. */
  let userId = ""
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    userId= user.id} else {
      userId="No user logged in";
    }

  /* QUIZ FETCH REQUIREMENT: any publically available quiz (or your quiz) */
  const { data: fetchedQuizData } = await supabase.from('quizzes').select().eq('id', `${params.quizId}`)


  return (
    <>
      <TopBar></TopBar>
      <BannerHeading heading="Your space"></BannerHeading>

      <div className="flex-1 w-full flex flex-col gap-20 items-center p-0 m-0">
          {/* CONDITION FOR SHOWING QUIZ: it exists */}        
          { fetchedQuizData?.length !==0 ? 
              <QuizFull fetchedQuizData={fetchedQuizData?.[0]} userId={userId}></QuizFull> : <div>This quiz either no longer exists, or you do not have permission to view it.</div>
          }
      </div>
    </>
  );
}
