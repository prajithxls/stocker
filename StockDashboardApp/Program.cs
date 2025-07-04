var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient();

var app = builder.Build();

app.UseStaticFiles(); 
app.UseRouting();
app.MapControllers(); 
app.Run();
