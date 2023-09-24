import Link from "next/link";
import StudentInfo from "./StudentInfo";

export default function Home() {
  const headingStyle = {
    textAlign: 'center', 
    color: 'blue',    
    fontWeight: 'bold',       
    fontSize: '36px',       
    fontFamily: 'Lucida Console, Monaco, monospace'
  };

  const paragraphStyle = {
    textAlign: 'center', 
    color: 'blue',    
    fontWeight: 'bold',       
    fontSize: '24px',       
    fontFamily: 'Lucida Console, Monaco, monospace'
  };

  return (
    <main>
        <h1 style={headingStyle}>CPRG 306: Web Development 2 - Assignments</h1>
        <StudentInfo />
        <div style={paragraphStyle}>
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
              <li>
                <p>
                  <Link href="/week3">Week 3</Link>
                </p>
              </li>     
          </ul>
        </div>
    </main>
  );
}
