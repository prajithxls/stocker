using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

namespace StockDashboardApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public StockController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("quotes")]
        public async Task<IActionResult> GetQuotes()
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "https://yahoo-finance127.p.rapidapi.com/multi-quote/nq=f,meta,goog,reliance.ns");

            request.Headers.Add("X-RapidAPI-Key", "6fb49c1151msh4b776f1ab7020b1p1912c5jsn99503b8a9e46");
            request.Headers.Add("X-RapidAPI-Host", "yahoo-finance127.p.rapidapi.com");

            try
            {
                var response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();

                return Content(json, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching stock data", error = ex.Message });
            }
        }

        [HttpGet("date")]
        public IActionResult GetDate()
        {
            var today = DateTime.Now.ToString("dd-MM-yyyy");
            return Ok(new { today_date = today });
        }
    }
}
