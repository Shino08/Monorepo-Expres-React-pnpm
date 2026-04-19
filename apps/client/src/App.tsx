interface AppProps {
  title?: string;
}

export default function App({ title = 'Click' }: AppProps) {
  return (
    <button
    onClick={async () => {
      const res = await fetch('/api');
      const data = await res.text();
      console.log(data);
    }}>
      {title}
    </button>
  );
}