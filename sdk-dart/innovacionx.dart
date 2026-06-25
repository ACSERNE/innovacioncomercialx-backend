import 'dart:convert';
import 'package:http/http.dart' as http;

class InnovacionX {
  final String token;
  final String baseUrl;

  InnovacionX({required this.token, this.baseUrl = "https://tu-dominio.com/api/public"});

  Future<dynamic> request(String endpoint) async {
    final url = Uri.parse(baseUrl + endpoint);

    final res = await http.get(
      url,
      headers: {
        "x-public-token": token,
        "Content-Type": "application/json",
      },
    );

    if (res.statusCode >= 400) {
      throw Exception("HTTP error ${res.statusCode}");
    }

    return jsonDecode(res.body);
  }

  Future<dynamic> getProductos() {
    return request("/productos");
  }
}
