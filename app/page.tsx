export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        4th Class Power Engineering Exam Prep
      </h1>

      <p className="mt-4">
        Study smarter. Pass faster.
      </p>

      <div className="mt-6 space-x-4">
        <a href="/quiz" className="underline">
          Start Quiz
        </a>
        <a href="/sections" className="underline">
          Study Sections
        </a>
      </div>
    </main>
  );
}