interface OriginClass {
  [key: number]: string
}

interface CategoryClass {
  [key: string]: string
}

const originClassMap: OriginClass = {
  0: 'self',
  1: 'other',
  2: 'hybrid',
}

const originTextMap: OriginClass = {
  0: '原创',
  1: '转载',
  2: '参考',
}

const categoryMap: CategoryClass = {
  code: '醉花阴',
  think: '无妄海',
  life: '清平乐',
}

const routerMap = {
  category: {
    code: {
      backgroundImg: '/static/images/app/code.jpg',
      text: '代码',
      icon: 'code',
    },
    think: {
      backgroundImg: '/static/images/app/think.jpg',
      text: '思考',
      icon: 'think',
    },
    life: {
      backgroundImg: '/static/images/app/life.jpg',
      text: '生活',
      icon: 'life',
    },
  },
  search: {
    backgroundImg: '/static/images/app/search.jpg',
    text: '搜索',
    icon: 'search',
  },
  date: {
    backgroundImg: '/static/images/app/date.jpg',
    icon: 'date',
  },
  guestbook: {
    backgroundImg: ' /static/images/app/guestbook.jpg',
    text: '留言板',
  },
}

export {
  originClassMap,
  originTextMap,
  categoryMap,
  routerMap,
}
