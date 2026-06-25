use reqwest::blocking::Client;

pub struct InnovacionX {
    token: String,
    base_url: String,
}

impl InnovacionX {
    pub fn new(token: &str) -> Self {
        Self {
            token: token.to_string(),
            base_url: "https://tu-dominio.com/api/public".to_string(),
        }
    }

    pub fn get_productos(&self) -> Result<String, reqwest::Error> {
        let client = Client::new();

        let res = client
            .get(format!("{}{}", self.base_url, "/productos"))
            .header("x-public-token", &self.token)
            .header("Content-Type", "application/json")
            .send()?;

        Ok(res.text()?)
    }
}
