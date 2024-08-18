export async function POST(req) {
    try {
      const data = await req.json();
      // Process the order data
      return new Response(JSON.stringify({ message: 'Order placed successfully!' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error placing order' }), { status: 500 });
    }
  }
  