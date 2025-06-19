var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient(); // For your API call

var app = builder.Build();

app.UseStaticFiles();  // Enable serving wwwroot
app.UseRouting();
app.MapControllers();  // Enables [ApiController] routing

app.Run();
