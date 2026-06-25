require "net/http"
require "json"

class InnovacionX
  def initialize(token, base_url = "https://tu-dominio.com/api/public")
    @token = token
    @base_url = base_url
  end

  def request(endpoint)
    uri = URI(@base_url + endpoint)
    req = Net::HTTP::Get.new(uri)
    req["x-public-token"] = @token
    req["Content-Type"] = "application/json"

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.request(req)
    end

    raise "HTTP error #{res.code}" if res.code.to_i >= 400

    JSON.parse(res.body)
  end

  def get_productos
    request("/productos")
  end
end
