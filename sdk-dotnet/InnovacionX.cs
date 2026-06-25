using System;
using System.Net.Http;
using System.Threading.Tasks;

public class InnovacionX
{
    private readonly string token;
    private readonly string baseUrl;
    private readonly HttpClient client;

    public InnovacionX(string token, string baseUrl = "https://tu-dominio.com/api/public")
    {
        if (string.IsNullOrEmpty(token))
            throw new Exception("Falta x-public-token");

        this.token = token;
        this.baseUrl = baseUrl;
        this.client = new HttpClient();
    }

    private async Task<string> Request(string endpoint)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, baseUrl + endpoint);
        request.Headers.Add("x-public-token", token);
        request.Headers.Add("Content-Type", "application/json");

        var response = await client.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            throw new Exception("HTTP Error " + response.StatusCode);

        return await response.Content.ReadAsStringAsync();
    }

    public Task<string> GetProductos()
    {
        return Request("/productos");
    }
}
