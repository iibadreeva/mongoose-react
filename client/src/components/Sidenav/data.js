export const items = [
  {
    type: 'navItem',
    icon: 'home',
    text: 'Главная',
    link: '/',
    restricted: false
  },
  {
    type: 'navItem',
    icon: 'user',
    text: 'Профиль',
    link: '/profile',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'users',
    text: 'Добавить пользователя',
    link: '/admin/create/user',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Логин',
    link: '/login',
    restricted: false,
    exclude: true
  },
  {
    type: 'navItem',
    icon: 'address-book-o',
    text: 'Мои книжки',
    link: '/admin/user-books',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'book',
    text: 'Создать книгу',
    link: '/admin/create/book',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'sign-out',
    text: 'Logout',
    link: '/user/logout',
    restricted: true
  }
];
