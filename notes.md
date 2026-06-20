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