export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "USD";
  const to = searchParams.get("to") || "KRW";
  const amount = searchParams.get("amount") || "1";

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
  const res = await fetch(url);
  const data = await res.json();

  const result = data.rates[to];

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
  });
} 

