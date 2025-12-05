# Drukomat PWR

## 🚀 Przegląd

Drukomat PWR to zaawansowany system do zarządzania drukarkami 3D, umożliwiający użytkownikom zdalne składanie zamówień na wydruki 3D. Aplikacja zawiera panel klienta, panel administracyjny oraz moduł symulacji wydruków.

## 🌟 Funkcjonalności

### Dla użytkowników
- Rejestracja i logowanie użytkowników
- Przeglądanie dostępnych modeli 3D
- Składanie zamówień na wydruki
- Śledzenie statusu zamówień
- Historia zamówień
- Integracja z płatnościami (Stripe)

### Dla administratorów
- Zarządzanie użytkownikami
- Zarządzanie zamówieniami
- Konfiguracja drukarek 3D
- Monitorowanie stanu drukarek
- Generowanie raportów

## 🛠️ Technologie

### Frontend
- React 18
- React Router DOM
- React Leaflet (mapy)
- React Icons
- Axios do komunikacji z API
- TailwindCSS do stylowania
- React Toastify do powiadomień

### Backend
- Node.js z Express
- MongoDB z Mongoose
- JSON Web Tokens (JWT) do autentykacji
- bcrypt do haszowania haseł
- Multer do przesyłania plików
- Stripe do płatności
- Jest do testów

### Narzędzia deweloperskie
- Nodemon do automatycznego przeładowywania serwera
- ESLint do lintingu kodu
- Prettier do formatowania kodu
- Git do kontroli wersji

## 🚀 Uruchomienie projektu

### Wymagania wstępne
- Node.js (wersja 16+)
- npm (wersja 8+)
- MongoDB (lokalna instancja lub URI)
- Konto Stripe (dla płatności)

### Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone [adres-repozytorium]
   cd drukomatPWR2
   ```

2. Zainstaluj zależności klienta i serwera:
   ```bash
   # Zainstaluj zależności klienta
   cd client
   npm install
   
   # Zainstaluj zależności serwera
   cd ../server
   npm install
   ```

3. Skonfiguruj zmienne środowiskowe:
   - Utwórz plik `.env` w katalogu `server/` z następującymi zmiennymi:
     ```
     MONGODB_URI=twoje_mongodb_uri
     JWT_SECRET=twoj_tajny_klucz
     STRIPE_SECRET_KEY=twoj_klucz_stripe
     ```

### Uruchomienie w trybie deweloperskim

1. Uruchom serwer:
   ```bash
   cd server
   npm run server
   ```

2. W nowym terminalu uruchom klienta:
   ```bash
   cd client
   npm start
   ```

3. Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## 🧪 Testowanie

### Testy jednostkowe serwera
```bash
cd server
npm test
```

### Testy E2E (Cypress)
```bash
cd client
npx cypress open
```

## 📁 Struktura projektu

```
drukomatPWR2/
├── client/                 # Aplikacja kliencka (React)
│   ├── public/            # Pliki statyczne
│   └── src/               # Kod źródłowy Reacta
│       ├── components/    # Komponenty React
│       ├── pages/         # Strony aplikacji
│       ├── services/      # Usługi API
│       └── App.js         # Główny komponent
│
├── server/                # Serwer (Node.js/Express)
│   ├── config/           # Konfiguracja
│   ├── controllers/      # Kontrolery
│   ├── models/           # Modele Mongoose
│   ├── routes/           # Definicje tras API
│   ├── middleware/       # Middleware Express
│   └── server.js         # Główny plik serwera
│
├── admin/                # Panel administracyjny
└── symulacja/           # Moduł symulacji wydruków
```

## 🤝 Wkład do projektu

1. Sforkuj projekt
2. Utwórz branch dla swojej funkcji (`git checkout -b feature/nowa-funkcjonalnosc`)
3. Zatwierdź zmiany (`git commit -am 'Dodano nową funkcjonalność'`)
4. Wypchnij zmiany (`git push origin feature/nowa-funkcjonalnosc`)
5. Otwórz Pull Request

## 📄 Licencja

Ten projekt jest objęty licencją MIT. Szczegóły znajdują się w pliku [LICENSE](LICENSE).

## 📞 Kontakt

W razie pytań prosimy o kontakt z zespołem projektowym.

---

<div align="center">
  <p>Wygenerowano z ❤️ przez zespół Drukomaniacy</p>
</div>
