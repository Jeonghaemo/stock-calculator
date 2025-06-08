export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "USD";
  const to = searchParams.get("to") || "KRW";
  const amount = parseFloat(searchParams.get("amount") || "1");

  const url = `https://open.er-api.com/v6/latest/${from}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  const rate = data.rates[to];
  if (typeof rate !== "number") {
    return new Response(JSON.stringify({ error: "해당 통화를 지원하지 않습니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = rate * amount;
  return new Response(JSON.stringify({ result }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}






