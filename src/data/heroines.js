export const heroines = [
  {
    id: 'haru',
    index: '01',
    age: 21,
    height: 158,
    accent: '#E3A35A',
    difficulty: 'low',
    stats: { early: 92, late: 30, initiative: 86, reply: 90, challenge: 22 },
  },
  {
    id: 'rei',
    index: '02',
    age: 25,
    height: 170,
    accent: '#8AA7C4',
    difficulty: 'high',
    stats: { early: 18, late: 78, initiative: 20, reply: 28, challenge: 88 },
  },
  {
    id: 'mio',
    index: '03',
    age: 22,
    height: 155,
    accent: '#B7A3C9',
    difficulty: 'mid',
    stats: { early: 80, late: 52, initiative: 72, reply: 84, challenge: 48 },
  },
  {
    id: 'kaede',
    index: '04',
    age: 27,
    height: 172,
    accent: '#C46A55',
    difficulty: 'high',
    stats: { early: 76, late: 16, initiative: 56, reply: 36, challenge: 86 },
  },
  {
    id: 'yuki',
    index: '05',
    age: 23,
    height: 166,
    accent: '#7CB86E',
    difficulty: 'mid',
    stats: { early: 54, late: 74, initiative: 40, reply: 38, challenge: 58 },
  },
  {
    id: 'nami',
    index: '06',
    age: 20,
    height: 160,
    accent: '#E39BB0',
    difficulty: 'mid',
    stats: { early: 74, late: 56, initiative: 76, reply: 78, challenge: 54 },
  },
  {
    id: 'sora',
    index: '07',
    age: 26,
    height: 168,
    accent: '#C4A484',
    difficulty: 'low',
    stats: { early: 50, late: 50, initiative: 46, reply: 50, challenge: 24 },
  },
]

export function getHeroine(id) {
  return heroines.find((h) => h.id === id) ?? null
}
