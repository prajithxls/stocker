using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FinanceController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public FinanceController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("quotes")]
        public async Task<IActionResult> GetQuotes()
        {
            string apiKey = "6fb49c1151msh4b776f1ab7020b1p1912c5jsn99503b8a9e46";
            string url = "https://yahoo-finance127.p.rapidapi.com/multi-quote/nq=f,meta,goog,reliance.ns";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("X-RapidAPI-Key", apiKey);
            request.Headers.Add("X-RapidAPI-Host", "yahoo-finance127.p.rapidapi.com");

            try
            {
                var response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();

                var responseBody = await response.Content.ReadAsStringAsync();

                using JsonDocument doc = JsonDocument.Parse(responseBody);
                var result = doc.RootElement;

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching data", error = ex.Message });
            }
        }

        [HttpGet("date")]
        public IActionResult GetTodayDate()
        {
            var date = DateTime.Now;
            string formatted = date.ToString("dd-MM-yyyy");
            return Ok(new { today_date = formatted });
        }
    }
}
