import Link from "next/link";

export default function StudentInfo() {
  const paragraphStyle = {
    textAlign: 'center', 
    color: 'blue',    
    fontWeight: 'bold',       
    fontSize: '24px',       
    fontFamily: 'Lucida Console, Monaco, monospace'
  };

  return (
    <main>
      <div style={paragraphStyle}>
        <p>Name: Sha Eugenio</p>
        <p>Course Section: CPRG 306 C</p>
        <Link href="https://github.com/ShaEugenio">GitHub Link: ShaEugenio</Link>
      </div>
      
    </main>
  )
}
