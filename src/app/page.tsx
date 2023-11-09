import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex justify-center'>
      <h1>Welcome to Frontend Problems</h1>
      <div className='flex'>
        <div>
          <Link href='/mortgage-calculator'> Mortgage Calculator</Link>
        </div>
        <div>
          <Link href='/contact-form'> Contact Form</Link>
        </div>
        <div>
          <Link href='/todo-list'> Todo List </Link>
        </div>
        <div>
          <Link href='/tictactoe'> Tictactoe </Link>
        </div>
      </div>
    </div>
  );
}
