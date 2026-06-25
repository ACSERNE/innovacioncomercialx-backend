package innovacionx

import (
    "bytes"
    "encoding/json"
    "errors"
    "io/ioutil"
    "net/http"
)

type InnovacionX struct {
    Token   string
    BaseURL string
}

func New(token string) *InnovacionX {
    if token == "" {
        panic("Falta x-public-token")
    }
    return &InnovacionX{
        Token:   token,
        BaseURL: "https://tu-dominio.com/api/public",
    }
}

func (api *InnovacionX) request(endpoint string, method string, body interface{}) ([]byte, error) {
    url := api.BaseURL + endpoint

    var jsonBody []byte
    var err error

    if body != nil {
        jsonBody, err = json.Marshal(body)
        if err != nil {
            return nil, err
        }
    }

    req, err := http.NewRequest(method, url, bytes.NewBuffer(jsonBody))
    if err != nil {
        return nil, err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("x-public-token", api.Token)

    client := &http.Client{}
    res, err := client.Do(req)
    if err != nil {
        return nil, err
    }

    defer res.Body.Close()
    data, _ := ioutil.ReadAll(res.Body)

    if res.StatusCode >= 400 {
        return nil, errors.New("HTTP error: " + res.Status)
    }

    return data, nil
}

func (api *InnovacionX) GetProductos() ([]byte, error) {
    return api.request("/productos", "GET", nil)
}
