const products = [
  { 
    id: 1, 
    name: 'Фиолетовый свитшот', 
    title: 'Фиолетовый свитшот', 
    description: 'Мягкий свитшот свободного кроя на каждый день.', 
    price: 3990, 
    category: 'Толстовки', 
    rating: 4.8, 
    reviewsCount: 24, 
    sizes: ['S', 'M', 'L', 'XL'] 
  },
  
  { id: 2, name: 'Базовая футболка', title: 'Базовая футболка', description: 'Хлопковая футболка с аккуратным минималистичным дизайном.', price: 1990, category: 'Футболки', rating: 4.6, reviewsCount: 18, sizes: ['S', 'M', 'L'] },
  { id: 3, name: 'Прямые джинсы', title: 'Прямые джинсы', description: 'Классические джинсы из плотного денима.', price: 5490, category: 'Брюки', rating: 4.9, reviewsCount: 31, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 4, name: 'Лёгкая куртка', title: 'Лёгкая куртка', description: 'Универсальная куртка для прохладных прогулок.', price: 7990, category: 'Куртки', rating: 4.7, reviewsCount: 12, sizes: ['M', 'L', 'XL'] },
  { id: 5, name: 'Трикотажный кардиган', title: 'Трикотажный кардиган', description: 'Тёплый кардиган с мягкой фактурой.', price: 4590, category: 'Свитеры', rating: 4.5, reviewsCount: 16, sizes: ['S', 'M', 'L'] },
  { id: 6, name: 'Юбка миди', title: 'Юбка миди', description: 'Лаконичная юбка миди для повседневных образов.', price: 3490, category: 'Юбки', rating: 4.4, reviewsCount: 9, sizes: ['S', 'M', 'L'] },
  { id: 7, name: 'Льняная рубашка', title: 'Льняная рубашка', description: 'Дышащая рубашка из натурального льна.', price: 4290, category: 'Рубашки', rating: 4.8, reviewsCount: 21, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 8, name: 'Спортивные брюки', title: 'Спортивные брюки', description: 'Комфортные брюки для отдыха и активного дня.', price: 2990, category: 'Брюки', rating: 4.3, reviewsCount: 14, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 9, name: 'Платье-футболка', title: 'Платье-футболка', description: 'Свободное хлопковое платье для повседневного образа.', price: 3890, category: 'Платья', rating: 4.7, reviewsCount: 20, sizes: ['S', 'M', 'L'] },
  { id: 10, name: 'Худи оверсайз', title: 'Худи оверсайз', description: 'Тёплое худи свободного кроя с мягким начёсом.', price: 4990, category: 'Толстовки', rating: 4.9, reviewsCount: 27, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 11, name: 'Белая рубашка relaxed', title: 'Белая рубашка relaxed', description: 'Универсальная рубашка для офисных и повседневных образов.', price: 4590, category: 'Рубашки', rating: 4.6, reviewsCount: 17, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 12, name: 'Широкие бежевые брюки', title: 'Широкие бежевые брюки', description: 'Свободные брюки с комфортным поясом.', price: 5290, category: 'Брюки', rating: 4.5, reviewsCount: 19, sizes: ['XS', 'S', 'M', 'L'] },
  { id: 13, name: 'Бомбер базовый', title: 'Бомбер базовый', description: 'Лёгкая демисезонная куртка в универсальном стиле.', price: 6990, category: 'Куртки', rating: 4.7, reviewsCount: 22, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 14, name: 'Майка с контрастным принтом', title: 'Майка с контрастным принтом', description: 'Хлопковая майка для активного повседневного стиля.', price: 1790, category: 'Футболки', rating: 4.2, reviewsCount: 11, sizes: ['S', 'M', 'L'] },
  { id: 15, name: 'Тёплая юбка-плиссе', title: 'Тёплая юбка-плиссе', description: 'Структурная юбка с мягкими складками.', price: 3790, category: 'Юбки', rating: 4.6, reviewsCount: 15, sizes: ['S', 'M', 'L'] },
  { id: 16, name: 'Вязаный джемпер', title: 'Вязаный джемпер', description: 'Мягкий джемпер средней плотности для прохладной погоды.', price: 4790, category: 'Свитеры', rating: 4.8, reviewsCount: 26, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 17, name: 'Черная спортивная олимпийка', title: 'Черная спортивная олимпийка', description: 'Куртка для тренировок и повседневной носки.', price: 5890, category: 'Спорт', rating: 4.4, reviewsCount: 13, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 18, name: 'Поло из мягкого трикотажа', title: 'Поло из мягкого трикотажа', description: 'Аккуратная базовая вещь для Smart Casual образа.', price: 3290, category: 'Футболки', rating: 4.5, reviewsCount: 18, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 19, name: 'Серое платье миди', title: 'Серое платье миди', description: 'Лаконичный силуэт для работы и встреч.', price: 6490, category: 'Платья', rating: 4.9, reviewsCount: 29, sizes: ['XS', 'S', 'M', 'L'] },
  { id: 20, name: 'Тренч лёгкий', title: 'Тренч лёгкий', description: 'Верхняя одежда без лишнего объема для межсезонья.', price: 8490, category: 'Куртки', rating: 4.8, reviewsCount: 32, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 21, name: 'Леггинсы со средней посадкой', title: 'Леггинсы со средней посадкой', description: 'Эластичные брюки для спорта и активного отдыха.', price: 2890, category: 'Спорт', rating: 4.3, reviewsCount: 16, sizes: ['S', 'M', 'L'] },
  { id: 22, name: 'Рубашка в мелкую клетку', title: 'Рубашка в мелкую клетку', description: 'Неформальная рубашка с мягким кроем.', price: 4190, category: 'Рубашки', rating: 4.6, reviewsCount: 20, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 23, name: 'Универсальная жилетка', title: 'Универсальная жилетка', description: 'Стёганая жилетка для многослойных осенних образов.', price: 3590, category: 'Свитеры', rating: 4.4, reviewsCount: 10, sizes: ['S', 'M', 'L'] },
  { id: 24, name: 'Капри для спортзала', title: 'Капри для спортзала', description: 'Комфортные спортивные брюки средней длины.', price: 2690, category: 'Спорт', rating: 4.2, reviewsCount: 12, sizes: ['XS', 'S', 'M', 'L'] },
]

export default products
