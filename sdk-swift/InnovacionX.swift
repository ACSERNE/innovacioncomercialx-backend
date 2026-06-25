import Foundation

public class InnovacionX {

    private let token: String
    private let baseUrl: String

    public init(token: String, baseUrl: String = "https://tu-dominio.com/api/public") {
        self.token = token
        self.baseUrl = baseUrl
    }

    private func request(endpoint: String, completion: @escaping (Result<Data, Error>) -> Void) {
        guard let url = URL(string: baseUrl + endpoint) else {
            completion(.failure(NSError(domain: "URL inválida", code: 0)))
            return
        }

        var request = URLRequest(url: url)
        request.addValue(token, forHTTPHeaderField: "x-public-token")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let http = response as? HTTPURLResponse, http.statusCode < 400 else {
                completion(.failure(NSError(domain: "HTTP error", code: 1)))
                return
            }

            completion(.success(data ?? Data()))
        }.resume()
    }

    public func getProductos(completion: @escaping (Result<Data, Error>) -> Void) {
        request(endpoint: "/productos", completion: completion)
    }
}
