package innovacionx

import okhttp3.OkHttpClient
import okhttp3.Request

class InnovacionX(private val token: String, private val baseUrl: String = "https://tu-dominio.com/api/public") {

    private val client = OkHttpClient()

    private fun request(endpoint: String): String {
        val req = Request.Builder()
            .url(baseUrl + endpoint)
            .addHeader("x-public-token", token)
            .addHeader("Content-Type", "application/json")
            .build()

        val res = client.newCall(req).execute()

        if (!res.isSuccessful) {
            throw Exception("HTTP error ${res.code}")
        }

        return res.body?.string() ?: ""
    }

    fun getProductos(): String {
        return request("/productos")
    }
}
