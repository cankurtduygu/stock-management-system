### useAuthCall nedir?

`useAuthCall`, authentication işlemleri için oluşturulan custom hook’tur.

Bu hook içinde API çağrıları yapılır. Örneğin:

- signIn
- signUp
- logout

Amaç, component içindeki uzun `try-catch` ve `axios` kodlarını ayırmak ve componenti daha temiz hale getirmektir.

### useAuthCall içinde Redux ve yönlendirme kullanımı

`useAuthCall` bir custom hook olduğu için içinde başka hook’lar kullanılabilir.

Bu yüzden burada şunları kullanabiliriz:

```js
const dispatch = useDispatch()
const navigate = useNavigate()

### BASE_URL'i .env dosyasından almak

API adresini doğrudan kodun içine yazmak yerine `.env` dosyasına koyarız.

Örnek:

```env
VITE_BASE_URL=http://localhost:8000/api/v1
await axios.post(`${BASE_URL}/auth/login`, userCredentials)

# Stock App - Öğrendiğim Notlar

## Redux Toolkit

### Slice Nedir?

Redux store'un belirli bir bölümünü yöneten modüldür.

Örnek:

Store

* authSlice
* productSlice
* stockSlice

Bir slice:

* State tutar
* Reducer'ları tutar
* Action üretir

---

### Provider Neden Kullanılır?

Store'u React componentlerine tanıtmak için.

```jsx
<Provider store={store}>
  <App />
</Provider>
```

Store tek başına yeterli değildir.

Componentlerin Store'a erişebilmesi için Provider gerekir.

---

### useSelector

Store'dan veri okumak için kullanılır.

```js
const currentUser = useSelector(selectCurrentUser);
```

Karar sorusu:

Veri okuyacak mıyım?

↓

Evet

↓

useSelector

---

### useDispatch

Store'u değiştirmek için kullanılır.

```js
dispatch(fillAuth(data));
```

Karar sorusu:

State değişecek mi?

↓

Evet

↓

useDispatch

---

## Local State mi Redux mu?

Karar ağacı:

Bu bilgi sadece bir componentte mi kullanılıyor?

↓

Evet

↓

Local State

---

Birden fazla component/sayfa kullanıyor mu?

↓

Evet

↓

Redux

---

Örnek Local State:

* modalOpen
* dropdownOpen
* activeTab
* form inputları
* filtreler (sadece o sayfadaysa)

---

Örnek Redux State:

* currentUser
* token
* theme
* cart
* products
* firms
* brands

---

## Authentication vs Authorization

### Authentication

Sen kimsin?

Token kontrol edilir.

Örnek:

```js
jwt.verify(token)
```

---

### Authorization

Bu işlemi yapabilir misin?

Örnek:

* Admin mi?
* Bu kaydın sahibi mi?
* Bu route'a erişebilir mi?

---

Kısaca:

Authentication

↓

Kimlik doğrulama

Authorization

↓

Yetkilendirme

---

## React Hook Form

### Controller Neden Kullanılır?

RHF normal inputları register ile yönetebilir.

Ama custom componentlerde Controller gerekir.

Örnek:

* Select
* DatePicker
* Combobox
* Shadcn componentleri

Controller:

RHF ile custom component arasında köprü görevi görür.

---

### isSubmitting

```jsx
disabled={isSubmitting}
```

Amaç:

Form gönderilirken butonun tekrar tekrar tıklanmasını engellemek.

Akış:

Submit başladı

↓

isSubmitting = true

↓

Button disabled

---

İşlem bitti

↓

isSubmitting = false

↓

Button aktif

---

## useLocation

Amaç:

Şu an hangi URL'deyim?

```js
const location = useLocation();
```

```js
location.pathname
```

Örnek:

```txt
/products
```

Aktif menüyü bulmak için kullanılır.

---

## useParams vs useLocation

URL:

```txt
/products/123
```

useLocation:

```txt
/products/123
```

useParams:

```txt
123
```

---

## Return Kullanıp Kullanmama Kararı

Kendime soracağım soru:

Bu fonksiyonu çağıran yer, sonuca göre karar verecek mi?

---

Evet:

```js
return true;
return false;
```

kullan.

Örnek:

* createStockData
* updateStockData
* deleteStockData

---

Hayır:

Return şart değil.

Örnek:

* getStockData

Çünkü sadece Redux state günceller.

---

### createStockData Neden return true/false Dönüyor?

```js
const isSuccess = await createStockData(...)
```

Component şu kararı veriyor:

```js
if (isSuccess) {
  form.reset();
  onOpenChange(false);
}
```

Yani:

Başarılıysa

↓

Modal kapat

↓

Form temizle

---

Başarısızsa

↓

Modal açık kalsın

↓

Kullanıcı hatayı görsün

---

## Redux Persist

Amaç:

Refresh sonrası Redux state kaybolmasın.

Normal akış:

F5

↓

Store sıfırlanır

---

Persist:

localStorage

↓

Store geri yüklenir

---

### Persist Ne Yapmaz?

Token'ın geçerli olup olmadığını kontrol etmez.

Bunu backend yapar.

Persist

↓

Veriyi saklar

Backend

↓

Veri geçerli mi kontrol eder

---

## localStorage vs sessionStorage

### localStorage

Tarayıcı kapansa bile veri kalır.

### sessionStorage

Sekme kapanınca veri silinir.

---

## React Router

### element

```js
{
  path: "/",
  element: <Home />
}
```

Anlamı:

Bu path eşleşirse hangi component gösterilecek?

---

### PublicOnlyRoute

Amaç:

Login olmuş kullanıcı

* sign-in
* sign-up

sayfalarına girmesin.

---

### ProtectedRoute

Amaç:

Login olmamış kullanıcı

* /stock

gibi korumalı sayfalara giremesin.

---

### navigate("/", { replace: true })

Anlamı:

Home'a git.

Browser history'deki mevcut sayfanın yerine yaz.

Böylece kullanıcı Back ile eski protected sayfaya dönemez.

---

## useEffect Neden Slice İçinde Kullanılmaz?

useEffect React'e aittir.

Slice Redux'a aittir.

Hook'lar:

* Component içinde
* Custom Hook içinde

çalışır.

Slice içinde çalışmaz.

---

## ThemeSync Mantığı

```jsx
function ThemeSync() {
  useTheme();
  return null;
}
```

Amaç:

UI çizmek değil.

Tema değişimlerini dinlemek.

Bu tip componentler:

Davranış Componenti

olarak düşünülebilir.

Ekranda görünmezler.

Sadece side-effect çalıştırırlar.

---

## Modal State Redux'ta mı Tutulur?

Karar ağacı:

Kim kullanıyor?

↓

Sadece ilgili sayfa/component

↓

Local State

---

Örnek:

```js
const [modalOpen, setModalOpen] = useState(false);
```

Modal açık mı kapalı mı bilgisi Redux'a konmaz.

Çünkü:

* Global değil
* Refresh sonrası korunması gerekmiyor
* Başka sayfalar kullanmıyor

---

## Header Mantığı

Axios:

```js
headers: {
  Authorization: `Token ${token}`,
}
```

Postman'da elle yazdığımız header ile aynıdır.

Backend için fark yoktur.

Backend sadece gelen request'e bakar.

İstek:

* Axios'tan gelebilir
* Postman'dan gelebilir
* REST Client'tan gelebilir

Backend için hepsi HTTP Request'tir.

---

## Error Nesnesi

```js
catch(error)
```

Buradaki error'u biz oluşturmuyoruz.

Axios/JavaScript oluşturuyor.

Örnek:

```js
error.message
error.response
error.response.data
```

---

### Backend Mesajı

```js
error.response.data.message
```

Backend'den gelir.

Örnek:

```json
{
  "message": "Password not validated."
}
```

---

### Axios Mesajı

```js
error.message
```

Örnek:

```txt
Network Error
Request failed with status code 401
```

---

## Commit Türleri

Yeni özellik:

```txt
feat:
```

Hata düzeltme:

```txt
fix:
```

Kod iyileştirme:

```txt
refactor:
```

Temizlik:

```txt
chore:
```

Örnek:

```txt
fix: correct typos in nav menu and auth hook
```

---

## En Önemli Öğrenme Soruları

Bir yapı gördüğümde kendime soracağım:

1. Kullanıcı ne yapmak istiyor?
2. Bu işlem için hangi bilgiler gerekli?
3. Bu bilgiler nereden geliyor?
4. Bu bilgi local state mi olmalı Redux mu?
5. Bu fonksiyonu çağıran yer sonuca göre karar verecek mi?
6. Bu fikri üreten kişi hangi problemi çözmeye çalışıyordu?

Kod ezberlemek yerine önce bu soruların cevabını arayacağım.
