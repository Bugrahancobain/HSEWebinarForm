export async function POST(req) {
    try {
        const body = await req.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwtm6qtq7Ua_sYtmnzbCjzGgIQwd2kuxrX_cevcTgnD0jAG9N8bnPParuL36Ig2nme5/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();
        console.log("Apps Script yanıtı:", data);
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Proxy Hatası:", error);
        return new Response(
            JSON.stringify({ error: "Proxy isteği başarısız oldu." }),
            { status: 500 }
        );
    }
}