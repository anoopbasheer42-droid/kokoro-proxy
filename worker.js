
export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const targetUrl = "https://kokoro-tts-lite-production-cefa.up.railway.app/v1/audio/speech";

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });

    try {
      const response = await fetch(modifiedRequest);
      const modifiedResponse = new Response(response.body, response);
      for (const [key, value] of Object.entries(corsHeaders)) {
        modifiedResponse.headers.set(key, value);
      }
      return modifiedResponse;
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
}
