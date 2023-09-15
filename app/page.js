import Link from "next/link";
import StudentInfo from "./StudentInfo";


export default function Home() {
  
  return (
    <main>
        <h1>CPRG 306: Web Development 2 - Assignments</h1>
        <StudentInfo />
        <div>
          <ul>
              <li>
                <p>
                  <Link href="/week1">Week 1</Link>
                </p>
              </li>
              <li>
                <p>
                  <Link href="/week2">Week 2</Link>
                </p>
              </li>    
          </ul>
       
        </div>
      
    </main>
  );
}
