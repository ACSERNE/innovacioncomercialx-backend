import java.net.http.*;
import java.net.URI;
import java.io.IOException;

public class InnovacionX {

    private String token;
    private String baseUrl;

    public InnovacionX(String token, String baseUrl) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("Falta x-public-token");
        }
        this.token = token;
        this.baseUrl = baseUrl;
    }

    public InnovacionX(String token) {
        this(token, "https://tu-dominio.com/api/public");
    }

    private String request(String endpoint) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + endpoint))
            .header("Content-Type", "application/json")
            .header("x-public-token", token)
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() >= 400) {
            throw new RuntimeException("Error HTTP " + response.statusCode());
        }

        return response.body();
    }

    public String getProductos() throws IOException, InterruptedException {
        return request("/productos");
    }
}
